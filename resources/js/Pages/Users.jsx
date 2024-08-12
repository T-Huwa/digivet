import { Helmet } from "react-helmet-async";

import { UserView } from "@/sections/user/view";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/dashboard";
import { Suspense } from "react";

// ----------------------------------------------------------------------

export default function Users() {
    return (
        <>
            <Head title="Users" />
            <DashboardLayout>
                <Suspense>
                    <UserView />
                </Suspense>
            </DashboardLayout>
        </>
    );
}
