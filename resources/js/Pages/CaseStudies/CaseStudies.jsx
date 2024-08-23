import DashboardLayout from "@/Layouts/dashboard";
import { BlogView } from "@/sections/blog/view";
import { Head } from "@inertiajs/react";

// ----------------------------------------------------------------------

export default function CaseStudies() {
    return (
        <>
            <Head title="Case Studies" />
            <DashboardLayout>
                <BlogView />
            </DashboardLayout>
        </>
    );
}
