import { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
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
import { DateRange, LocationOn } from "@mui/icons-material";

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

    const EonavConfig = [
        {
            title: "dashboard",
            path: "dashboard",
            icon: icon("ic_analytics"),
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
    ];

    const adminNav = [
        {
            title: "dashboard",
            path: "admin.dashboard",
            icon: icon("ic_analytics"),
        },
        {
            title: "users",
            path: "admin.users",
            icon: icon("ic_user"),
        },
        {
            title: "Areas",
            path: "admin.areas",
            icon: <LocationOn />,
        },
    ];

    const farmerNavConfig = [
        {
            title: "dashboard",
            path: "dashboard",
            icon: icon("ic_analytics"),
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
            <Avatar src="/assets/images/avatars/avatar_1.jpg" alt="photoURL" />

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
