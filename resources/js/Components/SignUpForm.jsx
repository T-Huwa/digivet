import { useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });

    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const response = await axios.post("/mail/signup", formData);
            alert(response.data.message);
            setProcessing(false);
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
            setProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-2">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <TextInput
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="max-w-lg flex-1 bg-white text-black"
                    placeholder="Your Name"
                    type="text"
                    required
                />
                <TextInput
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="max-w-lg flex-1 bg-white text-black"
                    placeholder="Email Address"
                    type="email"
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="max-w-lg flex-1 bg-white text-black border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">I am a...</option>
                    <option value="farmer">Farmer</option>
                    <option value="vet">Veterinary Professional</option>
                </select>
                <PrimaryButton
                    disabled={processing}
                    className="text-green-600 hover:bg-green-50"
                    type="submit"
                >
                    Sign Up for DigiVet
                </PrimaryButton>
            </form>
            <p className="text-xs text-green-100">
                By signing up, you agree to our{" "}
                <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                </Link>
            </p>
        </div>
    );
};

export default SignUpForm;
