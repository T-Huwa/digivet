import { ProductsView } from "@/sections/products/view";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function CaseStudiesPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <ProductsView />
        </>
    );
}
