import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/dashboard";
import { Head, useForm } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";

const Tips = ({ tips }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [messageDisplay, setMessageDisplay] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        animal_type: "",
        season: "",
        weather_threshhold: 20,
    });

    function closeModal() {
        setMessageDisplay(false);
        setModalOpen(false);
    }

    function openModal() {
        setModalOpen(true);
    }

    const submit = (e) => {
        e.preventDefault();
        setMessageDisplay(true);

        post(route("tips.new"), {
            onSuccess: (response) => {
                console.log("Success:", response.props.message);
                setTitle("Success");
                setContent(response.props.message + "!😀");
                reset(data);
            },
            onError: (error) => {
                setTitle("Error!");
                setContent("Failed to add tip<br/>" + error);
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
            <Head title="Tips" />
            <Box>
                <Box className="flex">
                    <Typography variant="h4" className="flex-1">
                        Tips
                    </Typography>
                    <PrimaryButton onClick={openModal}>
                        <Add className="mx-2" /> New Tip
                    </PrimaryButton>
                </Box>

                <Box className="p-4">
                    <List>
                        {tips.map((tip) => (
                            <ListItem className="border-b" key={tip.id}>
                                {tip.content}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            <Modal show={modalOpen} onClose={closeModal}>
                <Box className="p-6">
                    {messageDisplay && (
                        <>
                            <h2 className="text-lg font-medium text-gray-900">
                                {title}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                {content}
                            </p>
                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Okay
                                </SecondaryButton>
                            </div>
                        </>
                    )}
                    {!messageDisplay && (
                        <>
                            <Typography variant="h5">Add new tip</Typography>
                            <Box className="my-2">
                                <form onSubmit={submit}>
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
                                                setData(
                                                    "animal_type",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.animal_type}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="content"
                                            value="Add Tip Content"
                                        />
                                        <TextInput
                                            id="content"
                                            type="textarea"
                                            name="content"
                                            value={data.content}
                                            className="mt-1 block w-full rounded-md"
                                            onChange={(e) =>
                                                setData(
                                                    "content",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.content}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Season Field */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="season"
                                            value="Season"
                                        />
                                        <TextInput
                                            id="season"
                                            type="text"
                                            name="season"
                                            value={data.season}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "season",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.season}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Weather Threshold Field */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="weather_threshhold"
                                            value="Weather Threshold (°C)"
                                        />
                                        <TextInput
                                            id="weather_threshhold"
                                            type="number"
                                            name="weather_threshhold"
                                            value={data.weather_threshhold}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "weather_threshhold",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.weather_threshhold}
                                            className="mt-2"
                                        />
                                    </div>

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
                        </>
                    )}
                </Box>
            </Modal>
        </DashboardLayout>
    );
};

export default Tips;
