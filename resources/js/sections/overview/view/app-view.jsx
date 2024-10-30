import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "@/Components/iconify";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import AppProfile from "../app-profile";

// ----------------------------------------------------------------------

export default function AppView() {
    const inventoryRecords = usePage().props.inventoryRecords;
    const appointments = usePage().props.appointments;
    const caseStudies = usePage().props.caseStudies;

    console.log(usePage().props);

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
                {/* <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Animals"
                        total={totalAnimalCount}
                        color="success"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_bag.png"
                            />
                        }
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Animal Types"
                        total={inventoryRecords.length}
                        // color="info"
                        color="success"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_users.png"
                            />
                        }
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Appointments"
                        total={appointments}
                        //color="warning"
                        color="success"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_buy.png"
                            />
                        }
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Case Studies Posted"
                        total={caseStudies}
                        //color="error"
                        color="success"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_message.png"
                            />
                        }
                    />
                </Grid>
                
                <Grid xs={12} md={6} lg={8}>
                    <AppWebsiteVisits
                        title="Website Visits"
                        subheader="(+43%) than last year"
                        chart={{
                            labels: [
                                "01/01/2003",
                                "02/01/2003",
                                "03/01/2003",
                                "04/01/2003",
                                "05/01/2003",
                                "06/01/2003",
                                "07/01/2003",
                                "08/01/2003",
                                "09/01/2003",
                                "10/01/2003",
                                "11/01/2003",
                            ],
                            series: [
                                {
                                    name: "Team A",
                                    type: "column",
                                    fill: "solid",
                                    data: [
                                        23, 11, 22, 27, 13, 22, 37, 21, 44, 22,
                                        30,
                                    ],
                                },
                                {
                                    name: "Team B",
                                    type: "area",
                                    fill: "gradient",
                                    data: [
                                        44, 55, 41, 67, 22, 43, 21, 41, 56, 27,
                                        43,
                                    ],
                                },
                                {
                                    name: "Team C",
                                    type: "line",
                                    fill: "solid",
                                    data: [
                                        30, 25, 36, 30, 45, 35, 64, 52, 59, 36,
                                        39,
                                    ],
                                },
                            ],
                        }}
                    />
                    </Grid>

                 <Grid xs={12} md={6} lg={4}>
                    <AppCurrentVisits
                        title="Current Visits"
                        chart={{
                            series: [
                                { label: "America", value: 4344 },
                                { label: "Asia", value: 5435 },
                                { label: "Europe", value: 1443 },
                                { label: "Africa", value: 4443 },
                            ],
                        }}
                    />
                </Grid> */}

                <Grid xs={12} md={6} lg={8}>
                    <AppConversionRates
                        title="Conversion Rates"
                        subheader="(+43%) than last year"
                        chart={{
                            series: [
                                { label: "Italy", value: 400 },
                                { label: "Japan", value: 430 },
                                { label: "China", value: 448 },
                                { label: "Canada", value: 470 },
                                { label: "France", value: 540 },
                                { label: "Germany", value: 580 },
                                { label: "South Korea", value: 690 },
                                { label: "Netherlands", value: 1100 },
                                { label: "United States", value: 1200 },
                                { label: "United Kingdom", value: 1380 },
                            ],
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
