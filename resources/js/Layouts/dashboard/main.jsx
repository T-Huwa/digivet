import PropTypes from "prop-types";

import { Box } from "@mui/material";

import { useResponsive } from "@/hooks/use-responsive";

import { NAV, HEADER } from "./config-layout";

// ----------------------------------------------------------------------

const SPACING = 4;

export default function Main({ children, sx, ...other }) {
    const lgUp = useResponsive("up", "lg");

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                pt: `${HEADER.H_MOBILE + SPACING}px`,
                ...(lgUp && {
                    px: 2,
                    pt: `${HEADER.H_DESKTOP + SPACING}px`,
                    width: `calc(100% - ${NAV.WIDTH}px)`,
                }),
                pb: 2,
                backgroundColor: "rgb(240,240,240)",
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}

Main.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};
