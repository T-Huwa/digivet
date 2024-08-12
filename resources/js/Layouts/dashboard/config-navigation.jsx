import SvgColor from "@/Components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const navConfig = [
    {
        title: "dashboard",
        path: "/",
        icon: icon("ic_analytics"),
    },
    {
        title: "users",
        path: "/",
        icon: icon("ic_user"),
    },
    {
        title: "Inventory",
        path: "/",
        icon: icon("ic_cart"),
    },
    {
        title: "case studies",
        path: "/blog",
        icon: icon("ic_blog"),
    },
    {
        title: "login",
        path: "/login",
        icon: icon("ic_lock"),
    },
    {
        title: "Not found",
        path: "/404",
        icon: icon("ic_disabled"),
    },
];

export default navConfig;
