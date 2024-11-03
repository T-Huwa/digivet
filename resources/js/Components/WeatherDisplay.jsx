import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import {
    WbSunny,
    Cloud,
    Air,
    Opacity,
    WaterDrop,
    RefreshOutlined,
} from "@mui/icons-material";
import PrimaryButton from "./PrimaryButton";
import { usePage } from "@inertiajs/react";

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(4),
}));

const WeatherIcon = styled("div")(({ theme }) => ({
    fontSize: "4rem",
    marginRight: theme.spacing(2),
}));

export default function WeatherDisplay() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const city = usePage().props.district;

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [city]);

    const getWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
            case "Clear":
                return <WbSunny fontSize="inherit" color="warning" />;
            case "Clouds":
                return <Cloud fontSize="inherit" color="action" />;
            case "Rain":
                return <WaterDrop fontSize="inherit" color="primary" />;
            default:
                return <Cloud fontSize="inherit" color="action" />;
        }
    };

    return (
        <StyledCard>
            <CardContent>
                <PrimaryButton
                    fullWidth
                    onClick={fetchWeather}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <RefreshOutlined />
                    )}
                </PrimaryButton>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                {weather && (
                    <div>
                        <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
                            {weather.name}, {weather.sys.country}
                        </Typography>
                        <Grid container alignItems="center" sx={{ mb: 2 }}>
                            <WeatherIcon>
                                {getWeatherIcon(weather.weather[0].main)}
                            </WeatherIcon>
                            <Typography variant="h3">
                                {Math.round(weather.main.temp)}°C
                            </Typography>
                        </Grid>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {weather.weather[0].description}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    <Air
                                        fontSize="small"
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Wind: {weather.wind.speed} m/s
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    <Opacity
                                        fontSize="small"
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Humidity: {weather.main.humidity}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )}
                <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 2, textAlign: "center" }}
                >
                    Data provided by OpenWeatherMap
                </Typography>
            </CardContent>
        </StyledCard>
    );
}
