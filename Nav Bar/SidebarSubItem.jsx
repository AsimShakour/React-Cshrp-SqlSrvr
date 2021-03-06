import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import { Collapse, Badge } from "reactstrap";
import { Link } from "react-router-dom";
// import styles from "./css/SidebarSubItem.css"; //file should work now per instructions on mobile, etc

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({ item, isActive, handler, children, isOpen }) => (
  // const SidebarSubItem = ({ item, isActive, children, isOpen }) => (
  <li className={isActive ? "active" : ""}>
    <Link className="nav-item" to={item.path} onClick={handler}>
      {/* <div className="nav-item" onClick={handler}> */}
      {item.icon && <em className={item.icon} />}
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {/* <span><Link to={item.path}><Trans i18nKey={item.translate}> {item.name}</Trans></Link> */}
      <span><Trans i18nKey={item.translate}>{item.name}</Trans>
      </span></Link>
    <Collapse isOpen={isOpen}>
      <ul id={item.path} className="sidebar-nav sidebar-subnav">
        {children}
      </ul>
    </Collapse>
    {/* </div> */}
  </li >
);

SidebarSubItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};

export default React.memo(SidebarSubItem);
