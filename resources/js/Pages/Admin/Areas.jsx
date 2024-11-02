import React, { useState } from "react";
import {
    IconButton,
    Paper,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import DataTable from "@/Components/DataTable";
import DashboardLayout from "@/Layouts/dashboard";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Add } from "@mui/icons-material";
import AddAreaForm from "@/Components/AddAreaForm";
import Modal from "@/Components/Modal";

const Areas = ({ areas }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAreas, setFilteredAreas] = useState(areas);

    const [modalOpen, setModalOpen] = useState(false);
    function closeModal() {
        setModalOpen(false);
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredAreas(
            areas.filter(
                (area) =>
                    area.name.toLowerCase().includes(query) ||
                    area.district_name.toLowerCase().includes(query)
            )
        );
    };

    const handleDelete = (id) => {
        if (
            !confirm(
                "You are about to delete this area. All the users associated with it will also be deleted. Are you sure?"
            )
        )
            return;
        router.delete(`/areas/${id}/delete`, {
            onSuccess: () => {
                alert("Area Deleted!");
            },
            onError: (errors) => {
                console.error("Delete failed:", errors);
            },
        });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 10 },
        { field: "name", headerName: "Area Name", flex: 1 },
        { field: "district_name", headerName: "District", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            editable: false,
            renderCell: (params) => (
                <IconButton
                    color="secondary"
                    onClick={() => handleDelete(params.row.id)}
                >
                    <GridDeleteIcon />
                </IconButton>
            ),
        },
    ];

    const handleAddNewArea = () => {
        //router.visit(route("areas.add"));
        setModalOpen(true);
    };

    return (
        <DashboardLayout>
            <Typography variant="h4" className="text-center">
                Areas
            </Typography>
            <Paper elevation={4} className="sm:m-2 md:m-6 p-4">
                <Box display="flex" justifyContent="space-between" mb={2}>
                    {/* Search Box */}
                    <TextField
                        label="Search Areas"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {/* Add New Area Button */}
                    <PrimaryButton
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewArea}
                    >
                        <Add />
                    </PrimaryButton>
                </Box>

                {/* Data Table */}
                <DataTable rows={filteredAreas} columns={columns} />
            </Paper>

            <Modal show={modalOpen} onClose={closeModal}>
                <Box className="p-5">
                    <Typography className="text-center" variant="h6">
                        Add New Area
                    </Typography>
                    <AddAreaForm />
                </Box>
            </Modal>
        </DashboardLayout>
    );
};

export default Areas;
