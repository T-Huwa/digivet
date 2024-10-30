import { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import { Box } from "@mui/material";

const AppProfile = ({ animals, animalCount, appointments, posts }) => {
    const user = usePage().props.auth.user;
    const [tip, setTip] = useState("");

    useEffect(() => {
        axios
            .get(route("tips.getAll"))
            .then((response) => {
                console.log(response.data.tips);

                const tips = response.data.tips;

                if (tips.length > 0) {
                    const randomTip =
                        tips[Math.floor(Math.random() * tips.length)];
                    setTip(randomTip.content); // Assuming each tip has a 'content' property
                }
            })
            .catch((error) => {
                console.error("Error fetching tips:", error);
            });
    }, []);

    return (
        <>
            <div className="dark:bg-gray-800 shadow-lg rounded-lg relative mx-auto my-4 flex w-full flex-col items-center bg-white bg-cover p-4 dark:text-white">
                <div
                    className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                    style={{
                        backgroundImage:
                            'url("https://i.ibb.co/FWggPq1/banner.png")',
                    }}
                >
                    <Box
                        sx={{ width: 120 }}
                        className="absolute -bottom-12 flex items-center justify-center rounded-full border-4 border-white bg-pink-400"
                    >
                        <img
                            className="h-full w-full rounded-full"
                            src={user.profile_photo_url}
                            alt=""
                        />
                    </Box>
                </div>
                <div className="mt-16 flex flex-col items-center">
                    <h4 className="text-xl font-bold">{user.name}</h4>
                    <p className="text-gray-500 text-base font-normal">
                        {user.role}
                    </p>
                </div>
                <div className="mt-6 mb-3 flex gap-4 md:gap-14">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold">{posts}</h3>
                        <p className="text-gray-500 text-sm font-normal">
                            Posts
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold">{appointments}</h3>
                        <p className="text-gray-500 text-sm font-normal">
                            Appointments
                        </p>
                    </div>
                    {user.role === "Farmer" && (
                        <>
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-2xl font-bold">
                                    {animalCount}
                                </h3>
                                <p className="text-gray-500 text-sm font-normal">
                                    Total Animals
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-2xl font-bold">
                                    {animals}
                                </h3>
                                <p className="text-gray-500 text-sm font-normal">
                                    Animal Types
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <h3 className="text-xl font-bold">Tip Of the Day</h3>
                <p className="text-gray-300 text-center text-md font-normal">
                    {tip || "Loading..."}
                </p>
            </div>
        </>
    );
};

export default AppProfile;
