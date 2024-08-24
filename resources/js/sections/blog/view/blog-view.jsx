import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { posts } from "@/_mock/blog";

import Iconify from "@/Components/iconify";

import PostCard from "../post-card";
import PostSort from "../post-sort";
import PostSearch from "../post-search";
import { router, usePage } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

// ----------------------------------------------------------------------

export default function BlogView() {
    const caseStudies = usePage().props.caseStudies;

    return (
        <Container>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">Case Studies</Typography>

                <SecondaryButton
                    onClick={() => router.get(route("caseStudies.create"))}
                >
                    New Post
                </SecondaryButton>
            </Stack>

            <Stack
                mb={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <PostSearch posts={posts} />
                <PostSort
                    options={[
                        { value: "latest", label: "Latest" },
                        { value: "popular", label: "Popular" },
                        { value: "oldest", label: "Oldest" },
                    ]}
                />
            </Stack>

            <Grid container spacing={3}>
                {caseStudies.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </Grid>
        </Container>
    );
}
