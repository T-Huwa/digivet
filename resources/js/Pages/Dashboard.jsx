import DashboardLayout from "@/Layouts/dashboard";
import { AppView } from "@/sections/overview/view";
import { Head } from "@inertiajs/react";
export default function Dashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <AppView />
        </DashboardLayout>
    );
}
