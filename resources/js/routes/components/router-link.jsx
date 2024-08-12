import NavLink from "@/Components/NavLink";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link } from "@inertiajs/react";

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ href, ...other }, ref) => (
    <Link ref={ref} to={href} {...other} />
));

RouterLink.propTypes = {
    href: PropTypes.string,
};

export default RouterLink;
