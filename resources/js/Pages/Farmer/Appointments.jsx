import React from "react";
import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Box, IconButton, Typography } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import { Close, Create, Edit, OpenInNew, Save } from "@mui/icons-material";
import { Head, router } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import { Button } from "bootstrap";
import { useState } from "react";
import { useEffect } from "react";

export default function Appointments({ appointments, selectedAppointment }) {
    //console.log(appointments);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAppointment, setModalAppointment] = useState(null);
    const [editing, setEditing] = useState(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    //console.log(usePage().props);

    useEffect(() => {
        if (selectedAppointment) {
            setModalAppointment(selectedAppointment);
            setDate(selectedAppointment.appointment_date);
            setTime(selectedAppointment.time);
            
            //console.log(date);
            setModalOpen(true);
        }
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "appointment_date",
            headerName: "Appointment Date",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "extension_worker",
            headerName: "Extension Worker",
            minWidth: 150,
            flex: 1,
        },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "description",
            headerName: "Description",
            minWidth: 150,
            sortable: false,
            flex: 1,
        },
        {
            field: "service",
            headerName: "Service",
            minWidth: 150,
            sortable: false,
            flex: 1,
        },
        {
            field: "tag",
            headerName: "Animal Tag",
            minWidth: 150,
            sortable: false,
            flex: 1,
        },
        {
            field: "time",
            headerName: "Time",
            minWidth: 150,
            sortable: false,
            flex: 1,
        },
        {
            field: "feedback",
            headerName: "Feedback",
            minWidth: 150,
            sortable: false,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 70,
            renderCell: (params) => (
                <SecondaryButton
                    className="my-1 bg-inherit"
                    onClick={() => openModal(params.row)}
                >
                    <OpenInNew />
                </SecondaryButton>
            ),
        },
    ];

        const openModal = (appointment) => {
        setDate(appointment.appointment_date);
        setTime(appointment.time);

        //console.log(date);
        setModalAppointment(appointment);
        setModalOpen(true);
    };

    const closeModal = () => {
        setEditing(false);
        setModalOpen(false);
        setModalAppointment(null);
    };

    const handleAppointment = async (appointmentId, newStatus) => {
        closeModal();
        let response;
        try {
            if (editing) {
                response = await axios.post(route("appointments.update.date"), {
                    id: appointmentId,
                    date: date,
                    time: time,
                });
            } else {
                response = await axios.post(
                    route("appointments.update.status"),
                    {
                        id: appointmentId,
                        status: newStatus,
                    }
                );
            }

            alert("Appointment Updated");
            console.log("Appointment updated successfully:", response.data);

            return response.data;
        } catch (error) {
            alert("Error Updating appointment");
            console.error("Error updating appointment status:", error);

            return null;
        }
    };

    return (
        <DashboardLayout>
            <Head title="My Appointments" />

            <div style={{ height: 400, width: "100%" }}>
                <Box className="flex px-12">
                    <Typography
                        variant="h5"
                        className="font-bold p-6 text-center flex-1"
                    >
                        My Appointments
                    </Typography>
                    <PrimaryButton
                        as="button"
                        className="m-auto h-10"
                        onClick={() => router.get(route("appointments.create"))}
                    >
                        <Create className="mr-2" /> New Appoinment
                    </PrimaryButton>
                </Box>
                <DataTable rows={appointments} columns={columns} />
            </div>

            <Modal show={modalOpen} onClose={closeModal}>
                <Box className="p-6">
                    <Box className="flex">
                        <div className="flex-1">
                            <h2 className="text-lg font-medium text-gray-900">
                                Appointment Details
                            </h2>
                        </div>
                        <DangerButton onClick={closeModal}>
                            <Close />
                        </DangerButton>
                    </Box>

                    {modalAppointment && (
                        <>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <strong>ID:</strong>
                                    </td>
                                    <td className="pl-4">
                                        {modalAppointment.id}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Date: </strong>
                                    </td>
                                    <td className="pl-4">
                                        {editing && (
                                            <>
                                                <TextInput
                                                    value={date}
                                                    type="date"
                                                    onChange={(e) =>
                                                        setDate(e.target.value)
                                                    }
                                                />
                                                <TextInput
                                                    value={time}
                                                    type="time"
                                                    onChange={(e) =>
                                                        setTime(e.target.value)
                                                    }
                                                />

                                                <IconButton onClick={() =>
                                                    handleAppointment(
                                                        modalAppointment.id,
                                                        "Requested"
                                                    )
                                                }>
                                                    <Save/>
                                                </IconButton>
                                            </>
                                        )}

                                        {!editing && (
                                            <>
                                                {
                                                    modalAppointment.appointment_date + " At " + modalAppointment.time
                                                }
                                                {modalAppointment.status ===
                                                    "Requested" && (
                                                    <IconButton
                                                        onClick={() =>
                                                            setEditing(true)
                                                        }
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Status:</strong>
                                    </td>
                                    <td className="pl-4">
                                        {modalAppointment.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Description:</strong>
                                    </td>
                                    <td className="pl-4">
                                        {modalAppointment.description}
                                    </td>
                                </tr>
                            
                            </tbody></table>
                            {modalAppointment.status !== "Cancelled" &&
                                modalAppointment.status !== "Completed" && (
                                    <div className="mt-6 flex justify-end">
                                        <DangerButton
                                            className="mx-1"
                                            onClick={() =>
                                                handleAppointment(
                                                    modalAppointment.id,
                                                    "Cancelled"
                                                )
                                            }
                                        >
                                            Cancel
                                        </DangerButton>
                                    </div>
                                )}
                        </>
                    )}
                </Box>
            </Modal>
        </DashboardLayout>
    );
}
