import { useState } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { Link, usePage } from "@inertiajs/react";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: "Home",
        icon: "eva:home-fill",
    },
    {
        label: "Profile",
        icon: "eva:person-fill",
    },
    {
        label: "Settings",
        icon: "eva:settings-2-fill",
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const account = usePage().props.auth.user;
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    width: 40,
                    height: 40,
                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                    ...(open && {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    }),
                }}
            >
                <Avatar
                    src="/assets/images/avatars/avatar_1.jpg"
                    alt={account.name}
                    sx={{
                        width: 36,
                        height: 36,
                        border: (theme) =>
                            `solid 2px ${theme.palette.background.default}`,
                    }}
                >
                    {account.name.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1,
                        ml: 0.75,
                        width: 200,
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2 }}>
                    <Typography variant="subtitle2" noWrap>
                        {account.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                    >
                        {account.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={handleClose}>
                    <Link
                        className="w-full"
                        href={route("profile.edit")}
                        as="button"
                        sx={{
                            typography: "body2",
                            color: "error.main",
                        }}
                    >
                        Profile
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link
                        disableRipple
                        disableTouchRipple
                        className="w-full"
                        href={route("logout")}
                        method="post"
                        as="button"
                        sx={{
                            typography: "body2",
                            color: "error.main",
                        }}
                    >
                        Logout
                    </Link>
                </MenuItem>
            </Popover>
        </>
    );
}
