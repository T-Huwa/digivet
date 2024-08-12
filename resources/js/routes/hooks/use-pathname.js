import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

// ----------------------------------------------------------------------

export function usePathname() {
    const { pathname } = usePage();

    return useMemo(() => pathname, [pathname]);
}
