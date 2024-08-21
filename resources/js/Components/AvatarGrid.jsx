import React from "react";
import { Grid, Avatar } from "@mui/material";

const AvatarGrid = () => {
    // Array of avatar filenames
    const avatars = Array.from({ length: 23 }, (_, i) => `avatar_${i + 1}.jpg`);

    return (
        <Grid container spacing={2}>
            {avatars.map((avatar, index) => (
                <Grid item xs={4} sm={3} md={2} key={index}>
                    <Avatar
                        alt={`Avatar ${index + 1}`}
                        src={`/assets/images/avatars/${avatar}`} // Replace with the actual path to the avatars
                        sx={{ width: 56, height: 56 }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default AvatarGrid;
