import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function DataTable({ rows, columns }) {
    return (
        <div style={{ width: "100%" }} className="px-12">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                autoHeight={true}
                slots={{
                    toolbar: GridToolbar, // Add toolbar for export options
                }}
                sx={{
                    bgcolor: "white",
                    boxShadow: 2,
                    border: 2,
                    borderColor: "rgb(200,200,200)",
                    "& .MuiDataGrid-cell:hover": {
                        color: "rgb(140,140,140)",
                    },
                    px: 2,
                }}
            />
        </div>
    );
}
