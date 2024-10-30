import React from "react";
import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import { Create } from "@mui/icons-material";
import { Head, router } from "@inertiajs/react";

export default function Appointments({ appointments }) {
    console.log(appointments);

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
            field: "feedback",
            headerName: "Feedback",
            minWidth: 150,
            sortable: false,
            flex: 1,
        },
    ];

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
        </DashboardLayout>
    );
}
