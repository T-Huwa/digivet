import AddAreaForm from "@/Components/AddAreaForm";
import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import { Paper, Typography } from "@mui/material";

const AddArea = () => {
    return (
        <DashboardLayout>
            <Head title="Register" />

            <Paper
                elevation={4}
                className="bg-white p-6 md:p-16"
                sx={{ mx: "auto", width: 1, maxWidth: "sm" }}
            >
                <Typography variant="h4">Add New Area</Typography>
                <AddAreaForm />
            </Paper>
        </DashboardLayout>
    );
};

export default AddArea;
