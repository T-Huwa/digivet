import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Box, Typography, Button } from "@mui/material";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import React, { useState } from "react";
import { Close, OpenInNew } from "@mui/icons-material";
import axios from "axios";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Appointments({ appointments }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAppointment, setModalAppointment] = useState(null);
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "appointment_date",
            headerName: "Appointment Date",
            width: 200,
        },
        {
            field: "farmer",
            headerName: "Farmer",
            width: 200,
        },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "description",
            headerName: "Description",
            width: 150,
            sortable: false,
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
        setModalAppointment(appointment);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalAppointment(null);
    };

    const handleAppointment = async (appointmentId, newStatus) => {
        closeModal();
        try {
            const response = await axios.post(
                route("appointments.update.status"),
                {
                    id: appointmentId,
                    status: newStatus,
                }
            );

            alert("Appointment Updated");
            console.log("Appointment updated successfully:", response.data);

            return response.data;
        } catch (error) {
            alert("Error Accepting appointment");
            console.error("Error updating appointment status:", error);

            return null;
        }
    };

    return (
        <DashboardLayout>
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

                    {modalAppointment && (
                        <>
                            <div>
                                <p>
                                    <strong>ID:</strong> {modalAppointment.id}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {modalAppointment.appointment_date}
                                </p>
                                <p>
                                    <strong>Farmer:</strong>{" "}
                                    {modalAppointment.farmer}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {modalAppointment.status}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {modalAppointment.description}
                                </p>
                            </div>
                            {modalAppointment.status !== "Cancelled" && (
                                <div className="mt-6 flex justify-end">
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
                                                handleAppointment(
                                                    modalAppointment.id,
                                                    "Completed"
                                                )
                                            }
                                        >
                                            Complete
                                        </PrimaryButton>
                                    )}
                                </div>
                            )}{" "}
                        </>
                    )}
                </Box>
            </Modal>
        </DashboardLayout>
    );
}
