import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Iconify from "@/Components/iconify";
import axios from "axios";
import { router } from "@inertiajs/react";

// ----------------------------------------------------------------------

export default function UserTableRow({
    id,
    selected,
    name,
    avatarUrl,
    area_name,
    role,
    isVerified,
    email,
    handleClick,
}) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleDeleteUser = async () => {
        if (!window.confirm("Are you sure you want to delete this account?")) {
            return; // Abort the deletion if user cancels
        }

        // Post the delete request
        router.delete(route("profile.destroy", id), {
            onSuccess: () => {
                // Handle success (e.g., redirect, show a success message)
                alert("User Deleted!");
            },
            onError: (error) => {
                // Handle error (e.g., show an error message)
                console.error("Failed to delete user:", error);
            },
        });
    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox
                        disableRipple
                        checked={selected}
                        onChange={handleClick}
                    />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={avatarUrl} />
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{email}</TableCell>

                <TableCell>{role}</TableCell>

                <TableCell align="center">
                    {isVerified ? "Yes" : "No"}
                </TableCell>
                <TableCell>{area_name}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={handleDeleteUser}
                    sx={{ color: "error.main" }}
                >
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}

UserTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    area_name: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
