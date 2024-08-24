import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/dashboard";
import {
    Box,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";

export default function Register({ areas }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        password_confirmation: "",
        role: "Farmer",
        district_id: "",
        area_id: "",
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

        post(route("register"), {
            onSuccess: (response) => {
                // Log the success response
                console.log("Success:", response.props.message);
                setTitle("Success");
                setContent(response.props.message + "!🎉🔥😀🔥🔥");
                reset(data);
            },
            onError: (error) => {
                // Log any errors
                setTitle("Error!");
                setContent(
                    "Failed to add the user to the system😡<br/>" + error
                );
                console.log("Error:", error);
            },
            onFinish() {
                //alert("Finished!");
                setData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    role: "Farmer",
                    district_id: "",
                    area_id: "",
                });
                openModal();
            },
        });
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

    const filteredAreas = areas.filter(
        (area) => area.district_id === data.district_id
    );

    return (
        <DashboardLayout>
            <Head title="Register" />

            <Paper
                elevation={4}
                className="bg-white p-6 md:p-16"
                sx={{ mx: "auto", width: 1, maxWidth: "sm" }}
            >
                <Typography variant="h4">Add New User</Typography>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="phone" value="Phone Number(s)" />

                        <TextInput
                            id="phone"
                            type="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <FormControl className="mt-4" fullWidth>
                        <InputLabel id="role-label" className="mt-4">
                            Role
                        </InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            value={data.role}
                            label="Role"
                            onChange={(e) => setData("role", e.target.value)}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Extension Worker">
                                Extension officer
                            </MenuItem>
                            <MenuItem value="Farmer">Farmer</MenuItem>
                        </Select>
                        <InputError message={errors.role} className="mt-2" />
                    </FormControl>

                    {/* District Field */}
                    <FormControl className="mt-4" fullWidth>
                        <InputLabel id="district-label" className="mt-4">
                            District
                        </InputLabel>
                        <Select
                            labelId="district-label"
                            id="district"
                            value={data.district_id}
                            label="District"
                            onChange={(e) =>
                                setData("district_id", e.target.value)
                            }
                        >
                            {districts.map((district) => (
                                <MenuItem key={district.id} value={district.id}>
                                    {district.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError
                            message={errors.district_id}
                            className="mt-2"
                        />
                    </FormControl>

                    {/* Area Field */}
                    <FormControl fullWidth>
                        <InputLabel id="area-label" className="mt-4">
                            Area
                        </InputLabel>
                        <Select
                            labelId="area-label"
                            id="area"
                            value={data.area_id}
                            label="Area"
                            onChange={(e) => setData("area_id", e.target.value)}
                            disabled={!data.district_id} // Disable until a district is selected
                        >
                            {filteredAreas.map((area) => (
                                <MenuItem key={area.id} value={area.id}>
                                    {area.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.area_id} className="mt-2" />
                    </FormControl>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </Paper>
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
}
