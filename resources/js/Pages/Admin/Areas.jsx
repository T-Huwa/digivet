import DataTable from "@/Components/AreasTable";
import DashboardLayout from "@/Layouts/dashboard";
import { Paper } from "@mui/material";

const Areas = ({ areas }) => {
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Area Name" },
        { field: "district_name", headerName: "District" },
    ];

    return (
        <>
            <DashboardLayout>
                <Paper elevation={4} className="m-8">
                    <DataTable rows={areas} columns={columns} />
                </Paper>
            </DashboardLayout>
        </>
    );
};

export default Areas;
