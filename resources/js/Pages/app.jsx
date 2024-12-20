import { AppView } from "@/sections/overview/view";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function AppPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet>

            <AppView />
        </>
    );
}
