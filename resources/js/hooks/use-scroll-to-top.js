import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export function useScrollToTop() {
    const { pathname } = usePage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
