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

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
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

    const areas = [
        // Chitipa
        { id: 1, name: "Wenya", district_id: 1 },
        { id: 2, name: "Misuku", district_id: 1 },
        { id: 3, name: "Ifumbo", district_id: 1 },

        // Karonga
        { id: 4, name: "Wovwe", district_id: 2 },
        { id: 5, name: "Nyungwe", district_id: 2 },
        { id: 6, name: "Mpata", district_id: 2 },

        // Rumphi
        { id: 7, name: "Hewe", district_id: 3 },
        { id: 8, name: "Bolero", district_id: 3 },
        { id: 9, name: "Chiweta", district_id: 3 },

        // Mzimba
        { id: 10, name: "Embangweni", district_id: 4 },
        { id: 11, name: "Ekwendeni", district_id: 4 },
        { id: 12, name: "Mpherembe", district_id: 4 },

        // Nkhata Bay
        { id: 13, name: "Chintheche", district_id: 5 },
        { id: 14, name: "Usisya", district_id: 5 },
        { id: 15, name: "Mpamba", district_id: 5 },

        // Likoma
        { id: 16, name: "Likoma", district_id: 6 },
        { id: 17, name: "Chizumulu", district_id: 6 },
        { id: 18, name: "Mbamba", district_id: 6 },

        // Kasungu
        { id: 19, name: "Chulu", district_id: 7 },
        { id: 20, name: "Lifupa", district_id: 7 },
        { id: 21, name: "Kamboni", district_id: 7 },

        // Nkhotakota
        { id: 22, name: "Nkhunga", district_id: 8 },
        { id: 23, name: "Chididi", district_id: 8 },
        { id: 24, name: "Liwonde", district_id: 8 },

        // Ntchisi
        { id: 25, name: "Malomo", district_id: 9 },
        { id: 26, name: "Kachere", district_id: 9 },
        { id: 27, name: "Mphonde", district_id: 9 },

        // Dowa
        { id: 28, name: "Dzaleka", district_id: 10 },
        { id: 29, name: "Mponela", district_id: 10 },
        { id: 30, name: "Madisi", district_id: 10 },

        // Mchinji
        { id: 31, name: "Mkanda", district_id: 11 },
        { id: 32, name: "Mavwere", district_id: 11 },
        { id: 33, name: "Kawere", district_id: 11 },

        // Lilongwe
        { id: 34, name: "Area 25", district_id: 12 },
        { id: 35, name: "Area 49", district_id: 12 },
        { id: 36, name: "Mponela", district_id: 12 },

        // Salima
        { id: 37, name: "Senga Bay", district_id: 13 },
        { id: 38, name: "Kaphatenga", district_id: 13 },
        { id: 39, name: "Chipoka", district_id: 13 },

        // Dedza
        { id: 40, name: "Mayani", district_id: 14 },
        { id: 41, name: "Bembeke", district_id: 14 },
        { id: 42, name: "Mtakataka", district_id: 14 },

        // Ntcheu
        { id: 43, name: "Lizulu", district_id: 15 },
        { id: 44, name: "Sharpevale", district_id: 15 },
        { id: 45, name: "Bwanje", district_id: 15 },

        // Balaka
        { id: 46, name: "Chingeni", district_id: 16 },
        { id: 47, name: "Nkhonde", district_id: 16 },
        { id: 48, name: "Manjawira", district_id: 16 },

        // Mangochi
        { id: 49, name: "Monkey Bay", district_id: 17 },
        { id: 50, name: "Malindi", district_id: 17 },
        { id: 51, name: "Namwera", district_id: 17 },

        // Machinga
        { id: 52, name: "Ntaja", district_id: 18 },
        { id: 53, name: "Liwonde", district_id: 18 },
        { id: 54, name: "Ntumbi", district_id: 18 },

        // Zomba
        { id: 55, name: "Chancellor College", district_id: 19 },
        { id: 56, name: "Jali", district_id: 19 },
        { id: 57, name: "Thondwe", district_id: 19 },

        // Chiradzulu
        { id: 58, name: "Chiradzulu Boma", district_id: 20 },
        { id: 59, name: "Namitambo", district_id: 20 },
        { id: 60, name: "Ndunde", district_id: 20 },

        // Blantyre
        { id: 61, name: "Ndirande", district_id: 21 },
        { id: 62, name: "Chilomoni", district_id: 21 },
        { id: 63, name: "Limbe", district_id: 21 },

        // Mwanza
        { id: 64, name: "Mwanza Boma", district_id: 22 },
        { id: 65, name: "Lundu", district_id: 22 },
        { id: 66, name: "Neno Boma", district_id: 22 },

        // Thyolo
        { id: 67, name: "Goliati", district_id: 23 },
        { id: 68, name: "Bvumbwe", district_id: 23 },
        { id: 69, name: "Masambanjati", district_id: 23 },

        // Mulanje
        { id: 70, name: "Mulanje Boma", district_id: 24 },
        { id: 71, name: "Chitakale", district_id: 24 },
        { id: 72, name: "Limbuli", district_id: 24 },

        // Phalombe
        { id: 73, name: "Mpyupyu", district_id: 25 },
        { id: 74, name: "Chiringa", district_id: 25 },
        { id: 75, name: "Mwanza", district_id: 25 },

        // Chikwawa
        { id: 76, name: "Nchalo", district_id: 26 },
        { id: 77, name: "Ngabu", district_id: 26 },
        { id: 78, name: "Bangula", district_id: 26 },

        // Nsanje
        { id: 79, name: "Nsanje Boma", district_id: 27 },
        { id: 80, name: "Fatima", district_id: 27 },
        { id: 81, name: "Bangula", district_id: 27 },

        // Neno
        { id: 82, name: "Ligowe", district_id: 28 },
        { id: 83, name: "Lisungwi", district_id: 28 },
        { id: 84, name: "Chiwale", district_id: 28 },
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
