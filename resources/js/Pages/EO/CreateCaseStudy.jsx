import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";

const CreateCaseStudy = () => {
    return (
        <>
            <Head title="New Case Study" />
            <DashboardLayout>
                <Box>
                    <Typography variant="h4">Create New Case Study</Typography>
                </Box>
            </DashboardLayout>
        </>
    );
};

export default CreateCaseStudy;
