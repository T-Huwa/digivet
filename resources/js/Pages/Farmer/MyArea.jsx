import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import { Box } from "@mui/material";

const MyArea = ({ area_name, district_name, extensionWorkers }) => {
    const columns = [
        { field: "id", headerName: "ID", maxWidth: 90, flex: 1 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            minWidth: 100,
            flex: 1,
        },
    ];

    return (
        <>
            <Head title="My Area" />
            <DashboardLayout>
                <Box className="p-4 px-12">
                    <p className="text-xl">My Area</p>
                    <p className="text-lg">
                        {area_name}, {district_name}
                    </p>
                </Box>

                <Box>
                    <p className="text-lg px-12 text-center">
                        Extension Workers In my Area
                    </p>
                    <DataTable columns={columns} rows={extensionWorkers} />
                </Box>
            </DashboardLayout>
        </>
    );
};

export default MyArea;
