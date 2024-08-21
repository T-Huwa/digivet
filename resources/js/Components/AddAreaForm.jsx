import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    Button,
    Select,
    MenuItem,
    TextField,
    Box,
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

const AddAreaForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        district_id: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const districts = [
        { id: 1, name: "Chitipa" },
        { id: 2, name: "Karonga" },
        { id: 3, name: "Rumphi" },
        { id: 4, name: "Mzimba" },
        { id: 5, name: "Nkhata Bay" },
        { id: 6, name: "Likoma" },
        { id: 7, name: "Kasungu" },
        { id: 8, name: "Nkhotakota" },
        { id: 9, name: "Ntchisi" },
        { id: 10, name: "Dowa" },
        { id: 11, name: "Mchinji" },
        { id: 12, name: "Lilongwe" },
        { id: 13, name: "Salima" },
        { id: 14, name: "Dedza" },
        { id: 15, name: "Ntcheu" },
        { id: 16, name: "Balaka" },
        { id: 17, name: "Mangochi" },
        { id: 18, name: "Machinga" },
        { id: 19, name: "Zomba" },
        { id: 20, name: "Chiradzulu" },
        { id: 21, name: "Blantyre" },
        { id: 22, name: "Mwanza" },
        { id: 23, name: "Thyolo" },
        { id: 24, name: "Mulanje" },
        { id: 25, name: "Phalombe" },
        { id: 26, name: "Chikwawa" },
        { id: 27, name: "Nsanje" },
        { id: 28, name: "Neno" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the request to the server
        post(route("areas.add"), {
            onSuccess: (response) => {
                // Log the success response
                console.log("Success:", response.props.message);
                setTitle("Success");
                setContent("The Area was added successfully!🎉🔥😀🔥🔥");
            },
            onError: (error) => {
                // Log any errors
                setTitle("Error!");
                setContent("Failed to add the area to the system😡");
                console.log("Error:", error);
            },
            onFinish() {
                //alert("Finished!");
                openModal();
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-4">
                <FormControl className="m-4" fullWidth>
                    <InputLabel htmlFor="district_id">District</InputLabel>
                    <Select
                        label="District"
                        id="district_id"
                        value={data.district_id}
                        onChange={(e) => setData("district_id", e.target.value)}
                    >
                        {districts.map((district) => (
                            <MenuItem key={district.id} value={district.id}>
                                {district.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.district_id && <p>{errors.district_id}</p>}
                </FormControl>
            </div>

            <div className="mb-4">
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Area Name"
                    autoComplete="name"
                    value={data.name}
                    isfocused
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <PrimaryButton
                type="submit"
                variant="contained"
                disabled={processing}
            >
                Add Area
            </PrimaryButton>

            <Modal show={modalOpen} onClose={closeModal}>
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
            </Modal>
        </form>
    );
};

export default AddAreaForm;
