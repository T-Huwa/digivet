import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { Box } from "@mui/material";

const AppProfile = ({ animals, animalCount, appointments, posts }) => {
    const user = usePage().props.auth.user;
    const city = usePage().props.district;
    const [tip, setTip] = useState("");
    const [tipLoading, setTipLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
    const weatherURI = "https://api.openweathermap.org/data/2.5/weather";

    const fetchWeatherAndTip = async () => {
        setTipLoading(true);
        setError(null);

        try {
            // Fetch weather data directly from the OpenWeather API
            const weatherResponse = await fetch(
                `${weatherURI}?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!weatherResponse.ok) {
                throw new Error("City not found");
            }

            const weatherData = await weatherResponse.json();

            const tipResponse = await fetch(
                route("tips.gemini.ai.getOne") +
                    `?weatherData=${JSON.stringify(weatherData)}`
            );

            if (!tipResponse.ok) {
                throw new Error("Failed to fetch tip");
            }

            const data = await tipResponse.json();

            setTip(data.tip || "No tip available for the current conditions.");
        } catch (err) {
            console.error("Error:", err);
            setError(
                err.message || "An error occurred while fetching the data."
            );
            setTip("Could not load tip at this time.");
        } finally {
            setTipLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherAndTip();
    }, [city]);

    return (
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
                    <p className="text-gray-500 text-sm font-normal">Posts</p>
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
                            <h3 className="text-2xl font-bold">{animals}</h3>
                            <p className="text-gray-500 text-sm font-normal">
                                Animal Types
                            </p>
                        </div>
                    </>
                )}
            </div>
            <h3 className="text-xl font-bold">Tip Of the Day</h3>
            <p className="text-gray-300 text-center text-md font-normal">
                {tipLoading
                    ? "Loading tip..."
                    : typeof tip === "string"
                    ? tip
                    : tip.content}
            </p>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default AppProfile;
