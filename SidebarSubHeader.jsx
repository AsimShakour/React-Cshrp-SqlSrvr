import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({ item }) => (
  <li className="sidebar-subnav-header">
    <Link to={item.path}>{item.name}
    </Link>
  </li>

);
SidebarSubHeader.propTypes = {
  item: PropTypes.object.isRequired,
  // isActive: PropTypes.bool.isRequired,
};

export default React.memo(SidebarSubHeader);
