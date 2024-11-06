import { useEffect } from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import TerrainIcon from "@mui/icons-material/Terrain";

import { useResponsive } from "@/hooks/use-responsive";

import Logo from "@/Components/logo";
import Scrollbar from "@/Components/scrollbar";

import { NAV } from "./config-layout";
import { Link, usePage } from "@inertiajs/react";
import SvgColor from "@/Components/svg-color";
import {
    Chat,
    DateRange,
    LocationOn,
    TipsAndUpdates,
} from "@mui/icons-material";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
    const pathname = usePage().url;

    const account = usePage().props.auth.user;

    const icon = (name) => (
        <SvgColor
            src={`/assets/icons/navbar/${name}.svg`}
            sx={{ width: 1, height: 1 }}
        />
    );

    const reportsIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
        </svg>
    );

    const EonavConfig = [
        {
            title: "dashboard",
            path: "dashboard",
            icon: icon("ic_analytics"),
        },
        {
            title: "reports and analytics",
            path: "reports",
            icon: reportsIcon(),
        },
        {
            title: "My Area",
            path: "areas.view",
            icon: <LocationOn />,
        },
        {
            title: "Appointments",
            path: "appointments.get",
            icon: <DateRange />,
        },
        {
            title: "Case studies",
            path: "caseStudies",
            icon: icon("ic_blog"),
        },
        {
            title: "Chat Room",
            path: "chatroom",
            icon: <Chat />,
        },
    ];

    const adminNav = [
        {
            title: "dashboard",
            path: "dashboard",
            icon: icon("ic_analytics"),
        },
        {
            title: "reports and analytics",
            path: "reports",
            icon: reportsIcon(),
        },
        {
            title: "users",
            path: "users",
            icon: icon("ic_user"),
        },
        {
            title: "Areas",
            path: "areas",
            icon: <LocationOn />,
        },
        {
            title: "Tips",
            path: "tips",
            icon: <TipsAndUpdates />,
        },
    ];

    const farmerNavConfig = [
        {
            title: "dashboard",
            path: "dashboard",
            icon: icon("ic_analytics"),
        },
        {
            title: "reports and analytics",
            path: "reports",
            icon: reportsIcon(),
        },
        {
            title: "Inventory",
            path: "inventory",
            icon: icon("ic_cart"),
        },
        {
            title: "My Area",
            path: "areas.view",
            icon: <LocationOn />,
        },
        {
            title: "Case studies",
            path: "caseStudies",
            icon: icon("ic_blog"),
        },
        {
            title: "Appointments",
            path: "appointments.get",
            icon: <DateRange />,
        },
        {
            title: "Chat Room",
            path: "chatroom",
            icon: <Chat />,
        },
    ];

    const upLg = useResponsive("up", "lg");

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);

    const renderAccount = (
        <Box
            sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: "flex",
                borderRadius: 1.5,
                alignItems: "center",
                bgcolor: "rgba(0, 255, 0, 0.4)",
            }}
        >
            <Avatar src={account.profile_photo_url} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">{account.name},</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {account.role}
                </Typography>
            </Box>
        </Box>
    );

    const renderMenu = (
        <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
            {account.role === "Farmer" &&
                farmerNavConfig.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            {account.role === "Admin" &&
                adminNav.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            {account.role === "Extension Worker" &&
                EonavConfig.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
        </Stack>
    );

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                "& .simplebar-content": {
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Logo sx={{ mt: 3, ml: 4 }} />

            {renderAccount}

            {renderMenu}

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <Box
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.WIDTH },
            }}
        >
            {upLg ? (
                <Box
                    sx={{
                        height: 1,
                        position: "fixed",
                        width: NAV.WIDTH,
                        borderRight: (theme) =>
                            `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent}
                </Box>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.WIDTH,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}

Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
    const itemFirstSegment = item.path.split(".")[0];
    const pathname = usePage().url.split("/")[1];

    const active = pathname === itemFirstSegment;

    return (
        <ListItemButton
            component={Link}
            href={route(item.path)}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: "body2",
                color: "text.secondary",
                textTransform: "capitalize",
                fontWeight: "fontWeightMedium",
                ...(active && {
                    color: "primary.main",
                    fontWeight: "fontWeightSemiBold",
                    bgcolor: "rgba(0, 255, 0, 0.4)",
                    "&:hover": {
                        bgcolor: "rgba(0, 255, 0, 0.5)",
                    },
                }),
            }}
        >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                {item.icon}
            </Box>

            <Box component="span">{item.title} </Box>
        </ListItemButton>
    );
}

NavItem.propTypes = {
    item: PropTypes.object,
};
