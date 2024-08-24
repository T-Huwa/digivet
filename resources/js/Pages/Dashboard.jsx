import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DashboardLayout from "@/Layouts/dashboard";
import { AppView } from "@/sections/overview/view";
import { UserView } from "@/sections/user/view";
import { Head } from "@inertiajs/react";
export default function Dashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <AppView />
        </DashboardLayout>
    );
}
