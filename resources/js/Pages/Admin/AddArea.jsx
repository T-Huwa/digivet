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
                className="p-2 md:p-6 m-auto"
                sx={{ mx: "auto", width: 1, maxWidth: 400 }}
            >
                <Typography variant="h4">Add New Area</Typography>
                <AddAreaForm />
            </Paper>
        </DashboardLayout>
    );
};

export default AddArea;
