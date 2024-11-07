import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import AppNewsUpdate from "../app-news-update";
import { useEffect } from "react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import AppProfile from "../app-profile";
import WeatherDisplay from "@/Components/WeatherDisplay";
import AppRegistrationRates from "../app-conversion-rates";

// ----------------------------------------------------------------------

export default function AppView() {
    const inventoryRecords = usePage().props.inventoryRecords;
    const appointments = usePage().props.appointments;
    const caseStudies = usePage().props.caseStudies;
    const animalRegistrationRates = usePage().props.animalRegistrationRates;

    const [totalAnimalCount, setTotalAnimalCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        var total = 0;
        inventoryRecords.map((record) => {
            total += record.animal_count;
        });
        setTotalAnimalCount(total);
        total = 0;

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(route("notifications.index"));
                setNotifications(response.data.notifications);

                return response.data.notifications;
            } catch (error) {
                console.error("Error fetching notifications:", error);

                return null;
            }
        };

        fetchNotifications();
    }, []);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Welcome back
            </Typography>

            <AppProfile
                appointments={appointments}
                animals={inventoryRecords.length}
                animalCount={totalAnimalCount}
                posts={caseStudies}
            />

            <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                    <WeatherDisplay />
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                    <AppRegistrationRates
                        title="Animal Registration Rates"
                        subheader="(+5%) increase from last year"
                        chart={{
                            series: animalRegistrationRates.map((animal) => ({
                                label: animal.animal_type,
                                value: animal.count,
                            })),
                        }}
                    />
                </Grid>

                {/* <Grid xs={12} md={6} lg={4}>
                    <AppCurrentSubject
                        title="Current Subject"
                        chart={{
                            categories: [
                                "English",
                                "History",
                                "Physics",
                                "Geography",
                                "Chinese",
                                "Math",
                            ],
                            series: [
                                {
                                    name: "Series 1",
                                    data: [80, 50, 30, 40, 100, 20],
                                },
                                {
                                    name: "Series 2",
                                    data: [20, 30, 40, 80, 20, 80],
                                },
                                {
                                    name: "Series 3",
                                    data: [44, 76, 78, 13, 43, 10],
                                },
                            ],
                        }}
                    />
                </Grid> */}

                <Grid xs={12} md={6} lg={8}>
                    <AppNewsUpdate
                        title="Notifications"
                        list={notifications.map((notification, index) => ({
                            id: notification.id,
                            title: notification.data.title,
                            description: notification.data.message,
                            image: notification.data.eoProfile,
                            postedAt: notification.created_at,
                        }))}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
