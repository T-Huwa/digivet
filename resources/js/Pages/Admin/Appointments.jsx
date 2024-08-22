import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("/appointments")
            .then((response) => response.json())
            .then((data) => setAppointments(data));
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "farmer_id", headerName: "Farmer ID", width: 150 },
        {
            field: "extension_worker_id",
            headerName: "Extension Worker ID",
            width: 200,
        },
        { field: "area_id", headerName: "Area ID", width: 150 },
        {
            field: "appointment_date",
            headerName: "Appointment Date",
            width: 200,
        },
        { field: "status", headerName: "Status", width: 150 },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h2>Appointments</h2>
            <DataGrid rows={appointments} columns={columns} pageSize={5} />
        </div>
    );
}
