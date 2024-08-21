import TerrainIcon from "@mui/icons-material/Terrain";
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
        path: "dashboard",
        icon: icon("ic_analytics"),
    },
    {
        title: "users",
        path: "users",
        icon: icon("ic_user"),
    },
    {
        title: "Inventory",
        path: "users",
        icon: icon("ic_cart"),
    },
    {
        title: "Areas",
        path: "areas",
        icon: <TerrainIcon />,
    },
    {
        title: "case studies",
        path: "users",
        icon: icon("ic_blog"),
    },
    {
        title: "login",
        path: "users",
        icon: icon("ic_lock"),
    },
    {
        title: "Not found",
        path: "dashboard",
        icon: icon("ic_disabled"),
    },
];

export default navConfig;
