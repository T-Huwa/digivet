import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DashboardLayout from "@/Layouts/dashboard";
import { Textarea } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { Box, Input, Typography } from "@mui/material";

const CreateCaseStudy = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: null,
        content: "",
        photo: null, // Add photo to form data
    });

    function submit(e) {
        e.preventDefault();

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);

        // Check if a file has been selected before appending it
        if (data.photo) {
            formData.append("photo", data.photo);
        }

        // Submit the form data with the post method
        post(route("caseStudies.store"), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            preserveScroll: true,
            onSuccess: () => reset(), // Reset the form after successful submission
        });
    }

    return (
        <>
            <Head title="New Case Study" />
            <DashboardLayout>
                <Box>
                    <Typography variant="h4" className="p-12">
                        Create New Case Study
                    </Typography>
                    <Box className="mx-12">
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="content"
                                    value="Content:"
                                />

                                <Textarea
                                    id="content"
                                    type="textarea"
                                    name="content"
                                    value={data.content}
                                    className="mt-1 block w-full rounded-md"
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.content}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="photo" value="Photo:" />

                                <input
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    className="mt-1 block w-full rounded-md"
                                    onChange={(e) =>
                                        setData("photo", e.target.files[0])
                                    }
                                />

                                <InputError
                                    message={errors.photo}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Post
                                </PrimaryButton>
                            </div>
                        </form>
                    </Box>
                </Box>
            </DashboardLayout>
        </>
    );
};

export default CreateCaseStudy;
