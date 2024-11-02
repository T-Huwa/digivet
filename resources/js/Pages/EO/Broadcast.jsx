import React, { useState } from "react";
import { Container, Typography, TextField, Snackbar, Box } from "@mui/material";
import DashboardLayout from "@/Layouts/dashboard";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

export default function Broadcast() {
    const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(route("chatroom.send.broadcast"), { message })
            .then((response) => {
                // Log response and show success Snackbar
                console.log("Response from broadcast:", response);
                setOpenSnackbar(true);
                setMessage("");
            })
            .catch((error) => {
                console.error("Error sending broadcast:", error);
            });
    };

    return (
        <DashboardLayout>
            <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Send Broadcast to Farmers
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Broadcast Message"
                            multiline
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            margin="normal"
                            required
                        />
                        <PrimaryButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Send Broadcast
                        </PrimaryButton>
                    </form>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message="Broadcast sent successfully!"
                />
            </Container>
        </DashboardLayout>
    );
}
