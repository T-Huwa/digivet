import PropTypes from "prop-types";

import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { fDate } from "@/utils/format-time";

import SvgColor from "@/Components/svg-color";
import { router } from "@inertiajs/react";

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
    const { image_url, title, id, extension_worker, created_at } = post;

    const latestPostLarge = index === 0;

    const latestPost = index === 1 || index === 2;

    const renderAvatar = (
        <Avatar
            alt={"profile"}
            src={"/assets/images/avatars/avatar_1.jpg"}
            sx={{
                zIndex: 9,
                width: 32,
                height: 32,
                position: "absolute",
                left: (theme) => theme.spacing(3),
                bottom: (theme) => theme.spacing(-2),
                ...((latestPostLarge || latestPost) && {
                    zIndex: 9,
                    top: 24,
                    left: 24,
                    width: 40,
                    height: 40,
                }),
            }}
        />
    );

    const renderTitle = (
        <Link
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
                height: 44,
                overflow: "hidden",
                WebkitLineClamp: 2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                ...(latestPostLarge && { typography: "h5", height: 60 }),
                ...((latestPostLarge || latestPost) && {
                    color: "common.white",
                }),
            }}
        >
            {title}
        </Link>
    );

    const renderCover = (
        <Box
            component="img"
            alt={title}
            src={image_url}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: "cover",
                position: "absolute",
            }}
        />
    );

    const renderDate = (
        <Typography
            variant="caption"
            component="div"
            sx={{
                color: "text.disabled",
                ...((latestPostLarge || latestPost) && {
                    opacity: 0.48,
                    color: "common.white",
                }),
            }}
        >
            {fDate(created_at)}
        </Typography>
    );

    const renderShape = (
        <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: "absolute",
                color: "background.paper",
                ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
        />
    );

    return (
        <Grid
            xs={12}
            sm={latestPostLarge ? 12 : 6}
            md={latestPostLarge ? 6 : 3}
        >
            <Card
                className="post-card cursor-pointer hover:shadow-2xl hover:transform hover:translate-x-1 hover:-translate-y-1"
                onClick={() => router.get(`caseStudies/${id}`)}
            >
                <Box
                    sx={{
                        position: "relative",
                        pt: "calc(100% * 3 / 4)",
                        ...((latestPostLarge || latestPost) && {
                            pt: "calc(100% * 4 / 3)",
                            "&:after": {
                                top: 0,
                                content: "''",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                bgcolor: (theme) =>
                                    alpha(theme.palette.grey[900], 0.5),
                            },
                        }),
                        ...(latestPostLarge && {
                            pt: {
                                xs: "calc(100% * 4 / 3)",
                                sm: "calc(100% * 3 / 4.66)",
                            },
                        }),
                    }}
                >
                    {renderShape}

                    {renderAvatar}

                    {renderCover}

                    {latestPostLarge && (
                        <Box
                            sx={{
                                p: (theme) => theme.spacing(4, 3, 3, 3),
                                zIndex: 50,
                                ...((latestPostLarge || latestPost) && {
                                    width: 1,
                                    bottom: 0,
                                    position: "absolute",
                                }),
                            }}
                        >
                            {renderDate}
                            {renderTitle}
                        </Box>
                    )}
                    {latestPost && (
                        <Box
                            sx={{
                                p: (theme) => theme.spacing(4, 3, 3, 3),
                                zIndex: 50,
                                ...((latestPostLarge || latestPost) && {
                                    width: 1,
                                    bottom: 0,
                                    position: "absolute",
                                }),
                            }}
                        >
                            {renderDate}
                            {renderTitle}
                        </Box>
                    )}
                </Box>

                {/* Only render date and title outside of the cover box for non-latest posts */}
                {!latestPostLarge && !latestPost && (
                    <Box
                        sx={{
                            p: (theme) => theme.spacing(4, 3, 3, 3),
                            zIndex: 50,
                        }}
                    >
                        {renderDate}
                        {renderTitle}
                    </Box>
                )}
            </Card>
        </Grid>
    );
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    index: PropTypes.number,
};
