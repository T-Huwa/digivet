import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import React, { useState } from "react";
import { Close, Edit, OpenInNew, Save } from "@mui/icons-material";
import axios from "axios";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import { Textarea } from "@headlessui/react";
import TextInput from "@/Components/TextInput";

export default function Appointments({ appointments, selectedAppointment }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAppointment, setModalAppointment] = useState(null);
    const [completing, setCompleting] = useState(false);
    const [feedback, setFeedback] = useState("");
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
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "appointment_date",
            headerName: "Appointment Date",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "farmer",
            headerName: "Farmer",
            minWidth: 150,
            flex: 1,
        },
        { field: "status", headerName: "Status", minWidth: 150, flex: 1 },
        {
            field: "service",
            headerName: "Service",
            minWidth: 150,
            flex: 1,
            sortable: false,
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
            width: 150,
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
                console.log(time);
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
            alert("Error Processing appointment");
            console.error("Error updating appointment status:", error);

            return null;
        }
    };

    const completeAppointment = async (appointmentId) => {
        closeModal();
        try {
            const response = await axios.post(route("appointments.complete"), {
                id: appointmentId,
                feedback: feedback,
            });

            alert("Appointment Completed");
            console.log("Appointment completed successfully:", response.data);

            return response.data;
        } catch (error) {
            alert("Error Completing appointment");
            console.error("Error completing appointment:", error);

            return null;
        }
    };

    return (
        <DashboardLayout>
            <Head title="Appointments" />
            <div style={{ height: 400, width: "100%" }}>
                <Box className="flex">
                    <Typography
                        variant="h5"
                        className="font-bold p-6 text-center text-capitalize flex-1"
                    >
                        My Appointments
                    </Typography>
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
                    {modalAppointment !== "Completed"}

                    {modalAppointment && !completing && (
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

                                                <Button onClick={() =>
                                                    handleAppointment(
                                                        modalAppointment.id,
                                                        "Requested"
                                                    )
                                                }>
                                                    <Save/>
                                                </Button>
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
                                        <strong>Farmer:</strong>
                                    </td>
                                    <td className="pl-4">
                                        {modalAppointment.farmer}
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
                                        {modalAppointment.status ===
                                            "Requested" && (
                                            <SecondaryButton
                                                className="mx-1"
                                                onClick={() =>
                                                    handleAppointment(
                                                        modalAppointment.id,
                                                        "Pending"
                                                    )
                                                }
                                            >
                                                Accept
                                            </SecondaryButton>
                                        )}

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

                                        {modalAppointment.status !==
                                            "Requested" && (
                                            <PrimaryButton
                                                className="mx-1"
                                                onClick={() =>
                                                    setCompleting(true)
                                                }
                                            >
                                                Complete
                                            </PrimaryButton>
                                        )}
                                    </div>
                                )}
                        </>
                    )}

                    {completing && (
                        <>
                            <div className="my-4">
                                <InputLabel
                                    htmlFor="feedback"
                                    value="Enter Feedback"
                                />

                                <Textarea
                                    id="feedback"
                                    type="textarea"
                                    name="feedback"
                                    value={feedback}
                                    className="mt-1 block w-full rounded-md"
                                    onChange={(e) =>
                                        setFeedback(e.target.value)
                                    }
                                />
                            </div>
                            <PrimaryButton
                                className="mx-1"
                                onClick={() =>
                                    completeAppointment(modalAppointment.id)
                                }
                            >
                                Complete
                            </PrimaryButton>
                        </>
                    )}
                </Box>
            </Modal>
        </DashboardLayout>
    );
}
