import { UserView } from "@/sections/user/view";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/dashboard";
import { Suspense } from "react";

// ----------------------------------------------------------------------

export default function Users({ users }) {
    return (
        <>
            <Head title="Users" />
            <DashboardLayout>
                <Suspense>
                    <UserView users={users} />
                </Suspense>
            </DashboardLayout>
        </>
    );
}
