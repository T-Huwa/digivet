import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "@/Layouts/dashboard";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { Textarea } from "@headlessui/react";

const AppointmentForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_date: null,
        description: "",
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

    const submit = (e) => {
        e.preventDefault();

        post(route("appointments.create"), {
            onSuccess: (response) => {
                console.log("Success:", response.props.message);
                setTitle("Success");
                setContent(response.props.message + "!🔥😀🔥🔥");
                reset(data);
            },
            onError: (error) => {
                setTitle("Error!");
                setContent("Failed to create the appointment😡<br/>" + error);
                console.log("Error:", error);
            },
            onFinish() {
                reset();
                openModal();
            },
        });
    };

    return (
        <DashboardLayout>
            <Box className="sm:mx-2 md:mx-16 mt-6 p-12 border-2 rounded-md bg-white">
                <Typography variant="h5" className="m-2 text-center">
                    Book an Appointment
                </Typography>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="appointment_date" value="Date" />

                        <TextInput
                            id="appointment_date"
                            type="date"
                            name="appointment_date"
                            value={data.appointment_date}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("appointment_date", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.appointment_date}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="description"
                            value="Add Description"
                        />

                        <Textarea
                            id="description"
                            type="textarea"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full rounded-md"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Book
                        </PrimaryButton>
                    </div>
                </form>
            </Box>
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
        </DashboardLayout>
    );
};

export default AppointmentForm;
