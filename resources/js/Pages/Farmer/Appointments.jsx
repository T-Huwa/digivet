import React from "react";
import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import { Create } from "@mui/icons-material";
import { router } from "@inertiajs/react";

export default function Appointments({ appointments }) {
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "appointment_date",
            headerName: "Appointment Date",
            width: 200,
        },
        {
            field: "extension_worker",
            headerName: "Extension Worker",
            width: 200,
        },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "description",
            headerName: "Description",
            width: 150,
            sortable: false,
        },
    ];

    console.log(appointments);

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
                    <PrimaryButton
                        as="button"
                        className="m-4"
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
