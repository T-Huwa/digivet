import DangerButton from "@/Components/DangerButton";
import DataTable from "@/Components/DataTable";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import { Close, OpenInNew } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const MyArea = ({ area_name, district_name, farmers, extensionWorkers }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalFarmer, setModalFarmer] = useState(null);
    const [records, setRecords] = useState(null);

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
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <SecondaryButton
                    className="my-1 bg-inherit"
                    onClick={() => openModal(params.row)}
                >
                    <OpenInNew />
                </SecondaryButton>
            ),
        },
    ];

    const EOColumns = [
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

    const openModal = async (farmer) => {
        setModalFarmer(farmer);
        try {
            const response = await axios.get(`/inventory/${farmer.id}`);
            setRecords(response.data.inventoryRecords);
            setModalOpen(true);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalFarmer(null);
        setRecords(null);
    };

    return (
        <>
            <Head title="My Area" />
            <DashboardLayout>
                <Box className="p-4 px-12">
                    <p className="text-xl">My Area</p>
                    <p className="text-sm">
                        {area_name}, {district_name}
                    </p>
                </Box>

                <Box>
                    <p className="text-lg px-12 text-center">
                        Extension Workers In my Area
                    </p>
                    <DataTable columns={EOColumns} rows={extensionWorkers} />
                </Box>

                <Box className="my-12">
                    <p className="text-lg px-12 text-center">
                        Farmers In my Area
                    </p>
                    <DataTable columns={columns} rows={farmers} />
                </Box>
            </DashboardLayout>

            <Modal show={modalOpen} onClose={closeModal}>
                <Box className="p-6">
                    <Box className="flex">
                        <div className="flex-1">
                            <h2 className="text-lg font-medium text-gray-900">
                                Farmer Details
                            </h2>
                        </div>
                        <DangerButton onClick={closeModal}>
                            <Close />
                        </DangerButton>
                    </Box>

                    {modalFarmer && (
                        <>
                            <div>
                                <p>
                                    <strong>Name:</strong> {modalFarmer.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {modalFarmer.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {modalFarmer.phone}
                                </p>
                            </div>

                            {records && (
                                <Box className="mt-4">
                                    <p className="text-lg">Inventory:</p>
                                    <Divider />
                                    {records.map((record) => (
                                        <div key={record.id}>
                                            <span className="text-lg font-bold">
                                                {record.animal_type}:
                                            </span>
                                            <span className="ml-6 text-sm">
                                                {record.animal_count}
                                            </span>
                                        </div>
                                    ))}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default MyArea;
