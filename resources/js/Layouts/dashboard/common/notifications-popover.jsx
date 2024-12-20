import { useState } from "react";
import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { faker } from "@faker-js/faker";

import { Box } from "@mui/material";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

import { fToNow } from "@/utils/format-time";

import Iconify from "@/Components/iconify";
import Scrollbar from "@/Components/scrollbar";
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
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

    const totalUnRead = notifications.filter(
        (item) => item.read_at === null
    ).length;

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                isUnRead: false,
            }))
        );
    };

    return (
        <>
            <IconButton
                color={open ? "primary" : "default"}
                onClick={handleOpen}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
                </Badge>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        ml: 0.75,
                        width: 360,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        py: 2,
                        px: 2.5,
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                            Notifications
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            You have {totalUnRead} unread messages
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title=" Mark all as read">
                            <IconButton
                                color="primary"
                                onClick={handleMarkAllAsRead}
                            >
                                <Iconify icon="eva:done-all-fill" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader
                                disableSticky
                                sx={{ py: 1, px: 2.5, typography: "overline" }}
                            >
                                New
                            </ListSubheader>
                        }
                    >
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                            />
                        ))}
                    </List>

                    <List
                        disablePadding
                        subheader={
                            <ListSubheader
                                disableSticky
                                sx={{ py: 1, px: 2.5, typography: "overline" }}
                            >
                                Before that
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(2, 5).map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                            />
                        ))}
                    </List>
                </Scrollbar>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Box sx={{ p: 1 }}>
                    <Button fullWidth disableRipple>
                        View All
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
    notification: PropTypes.shape({
        createdAt: PropTypes.instanceOf(Date),
        id: PropTypes.string,
        isUnRead: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        avatar: PropTypes.any,
    }),
};

function NotificationItem({ notification }) {
    const { avatar, title } = renderContent(notification);

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: "1px",
                ...(notification.read_at !== null && {
                    bgcolor: "action.selected",
                }),
            }}
            onClick={() => {
                router.get(
                    `appointments/?selectedAppointmentId=${notification.data.appointment_id}`
                );
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: "background.neutral" }}>
                    {notification.data.profile_photo_url}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: "flex",
                            alignItems: "center",
                            color: "text.disabled",
                        }}
                    >
                        <Iconify
                            icon="eva:clock-outline"
                            sx={{ mr: 0.5, width: 16, height: 16 }}
                        />
                        {fToNow(notification.created_at)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
    const title = (
        <Typography variant="subtitle2">
            {notification.data.title}
            <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.secondary" }}
            >
                &nbsp; {notification.data.message}
            </Typography>
        </Typography>
    );
    return {
        avatar: (
            <img
                alt={notification.data.title}
                src={notification.data.profile_photo_url}
            />
        ),
        title,
    };
}
