import Checkbox from "@/Components/Checkbox";
import DangerButton from "@/Components/DangerButton";
import DataTable from "@/Components/DataTable";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/dashboard";
import { CloseButton } from "@headlessui/react";
import { Head, router, useForm } from "@inertiajs/react";
import { Close, CreateNewFolder, Edit, OpenInNew } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Inventory = ({ inventoryRecords }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState("add_new");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalRecord, setModalRecord] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editAnimalCount, setEditAnimalCount] = useState(null);
    const [usingTags, setUsingTags] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        animal_type: "",
        animal_count: null,
        tag_number: null,
    });

    const columns = [
        { field: "id", headerName: "ID", maxWidth: 90, flex: 1 },
        {
            field: "animal_type",
            headerName: "Animal Type",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "animal_count",
            headerName: "Count",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "tag_number",
            headerName: "Tag Number",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            renderCell: (params) => (
                <SecondaryButton
                    onClick={() => viewRecord(params.row)}
                    className="my-1 bg-inherit"
                >
                    <OpenInNew />
                </SecondaryButton>
            ),
            flex: 1,
        },
    ];

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalAction("add_new");
        setModalOpen(false);
    };

    const viewRecord = (record) => {
        setModalAction("view_record");
        setEditAnimalCount(record.animal_count);
        setModalRecord(record);
        openModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("inventory.create.record"), {
            onSuccess: (response) => {
                console.log("Success:", response.props.success);
                setTitle("Success");
                setContent(response.props.success + "!🔥😀🔥🔥");
                reset(data);
            },
            onError: (error) => {
                setTitle("Error!");
                setContent("Failed to create the appointment😡<br/>" + error);
                console.log("Error:", error);
            },
            onFinish() {
                reset();
                setModalAction("form_response");
                openModal();
            },
        });
    };

    const handleUpdate = async (recordId, newCount) => {
        closeModal();

        router.patch(
            route("inventory.update.record"),
            {
                id: recordId,
                newCount: newCount,
            },
            {
                onSuccess: (response) => {
                    console.log("Success:", response.props.success);
                    setTitle("Success");
                    setContent(response.props.success + "!🔥😀🔥🔥");
                    reset(data);
                },
                onError: (error) => {
                    setTitle("Error!");
                    setContent("Failed to Update😡<br/>" + error);
                    console.log("Error:", error);
                },
                onFinish() {
                    reset();
                    setModalAction("form_response");
                    openModal();
                },
            }
        );
    };

    return (
        <>
            <DashboardLayout>
                <Head title="Inventory" />
                <Box className="flex my-2 p-3">
                    <p className="flex-1 text-3xl">My Inventory</p>
                    <PrimaryButton onClick={openModal} className="my-2 h-10">
                        <CreateNewFolder className="mr-0 sm:mr-1" />{" "}
                        <span className="hidden sm:block">New Record</span>
                    </PrimaryButton>
                </Box>
                <DataTable rows={inventoryRecords} columns={columns} />
            </DashboardLayout>

            <Modal show={modalOpen} onClose={closeModal}>
                {modalAction === "add_new" && (
                    <Box className="p-6">
                        <Box className="flex">
                            <Typography className="flex-1" variant="h6">
                                Add New Inventory Record
                            </Typography>
                            <CloseButton className="bg-red">
                                <Close color="grb(255,0,0)" />
                            </CloseButton>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="animal_type"
                                    value="Animal Type"
                                />

                                <TextInput
                                    id="animal_type"
                                    type="text"
                                    name="animal_type"
                                    value={data.animal_type}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("animal_type", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.animal_type}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-4">
                                <InputLabel
                                    htmlFor="animal_count"
                                    value="Number of Animals"
                                />

                                <TextInput
                                    id="animal_count"
                                    type="number"
                                    name="animal_count"
                                    value={data.animal_count}
                                    className="mt-1 block w-full rounded-md"
                                    onChange={(e) =>
                                        setData("animal_count", e.target.value)
                                    }
                                    disabled={usingTags}
                                />

                                <InputError
                                    message={errors.animal_count}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex">
                                <Checkbox
                                    name="use_tags"
                                    id="use_tags"
                                    className="mx-2"
                                    onChange={() => setUsingTags(!usingTags)}
                                />
                                <InputLabel
                                    htmlFor="use_tags"
                                    value="Use Tags"
                                />
                            </div>

                            {usingTags && (
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="tag_number"
                                        value="Animal Tag"
                                    />

                                    <TextInput
                                        id="tag_number"
                                        type="number"
                                        name="tag_number"
                                        value={data.tag_number}
                                        className="mt-1 block w-full rounded-md"
                                        onChange={(e) =>
                                            setData(
                                                "tag_number",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.tag_number}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Add
                                </PrimaryButton>
                            </div>
                        </form>
                    </Box>
                )}

                {modalAction === "form_response" && (
                    <Box className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">{content}</p>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Okay
                            </SecondaryButton>
                        </div>
                    </Box>
                )}

                {modalAction === "view_record" && modalRecord && (
                    <Box className="p-6">
                        <Box className="flex">
                            <Typography className="flex-1" variant="h6">
                                View Inventory Record
                            </Typography>
                            <CloseButton className="bg-red">
                                <Close color="grb(255,0,0)" />
                            </CloseButton>
                        </Box>
                        <div className="mt-4">
                            <InputLabel
                                htmlFor="animal_type"
                                value="Animal Type"
                            />

                            <input
                                id="animal_type"
                                type="text"
                                name="animal_type"
                                value={modalRecord.animal_type}
                                className="mt-1 block border-0"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="animal_count"
                                value="Number of Animals"
                            />
                            <Box className="flex">
                                <TextInput
                                    id="animal_count"
                                    type="number"
                                    name="animal_count"
                                    className="mt-1 block rounded-md "
                                    value={editAnimalCount}
                                    disabled={!editing}
                                    onChange={(e) =>
                                        setEditAnimalCount(e.target.value)
                                    }
                                />
                                <SecondaryButton
                                    onClick={() => setEditing(true)}
                                >
                                    <Edit />
                                </SecondaryButton>
                            </Box>

                            <InputError
                                message={errors.animal_count}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                onClick={() => {
                                    handleUpdate(
                                        modalRecord.id,
                                        editAnimalCount
                                    );
                                    reset();
                                }}
                                className="ms-4"
                                disabled={!editing}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </Box>
                )}
            </Modal>
        </>
    );
};

export default Inventory;
