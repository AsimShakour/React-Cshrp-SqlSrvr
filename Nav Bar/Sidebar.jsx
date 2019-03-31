import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/actions";

import SidebarRun from "../uiHelpers/Sidebar.run";
import SidebarUserBlock from "./SidebarUserBlock";

import Menu from "../uiHelpers/Menu";
import SidebarItemHeader from "./sidebar/SidebarItemHeader";
import SidebarItem from "./sidebar/SidebarItem";
import SidebarSubItem from "./sidebar/SidebarSubItem";
import SidebarSubHeader from "./sidebar/SidebarSubHeader";

import logger from "../../logger";

const _logger = logger.extend("Sidebar");

class Sidebar extends Component {
  state = {
    collapse: {}
  };

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator, this.closeSidebar);
    // prepare the flags to handle menu collapsed states
    this.buildCollapseList();

    // Listen for routes changes in order to hide the sidebar on mobile
    this.props.history.listen(this.closeSidebar);
  }

  closeSidebar = () => {
    this.props.actions.toggleSetting("asideToggled");
  };

  /** prepare initial state of collapse menus. Doesnt allow same route names */
  buildCollapseList = () => {
    let collapse = {}; //builds empty obj
    Menu.filter(({ heading }) => !heading).forEach(
      ({ name, path, submenu }) => {
        collapse[name] = this.routeActive(
          submenu ? submenu.map(({ path }) => path) : path
        );
      }
    );
    this.setState({ collapse });
  };

  navigator = route => {
    this.props.history.push(route);
  };

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    return paths.some(p => this.props.location.pathname.indexOf(p) > -1);
  }

  toggleItemCollapse(stateName) {
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName)
        this.setState({
          collapse: {
            [c]: false
          }
        });
    }
    this.setState({
      collapse: {
        [stateName]: !this.state.collapse[stateName]
      }
    });
  }

  getSubRoutes = item => item.submenu.map(({ path }) => path);

  /** map menu config to string to determine which element to render */
  itemType = item => {
    if (item.heading) return "heading";
    if (!item.submenu) return "menu";
    if (item.submenu) return "submenu";
  };

  mapMenuItem = (item, i) => {
    const thisType = this.itemType(item);
    if (thisType === "heading") {
      _logger("SidebarItemHeader", item);
      return <SidebarItemHeader item={item} key={i} />;
    } else if (thisType === "menu") {
      return (
        <SidebarItem
          isActive={this.routeActive(item.path)}
          item={item}
          key={i}
        />
      );
    } else if (thisType === "submenu") {
      return [
        <SidebarSubItem
          item={item}
          isOpen={this.state.collapse[item.name] || false}
          handler={this.toggleItemCollapse.bind(this, item.name)}
          isActive={this.routeActive(item.path) || this.routeActive(this.getSubRoutes(item))}
          key={i}
        >
          <SidebarSubHeader item={item} key={i} />
          {item.submenu.map((subitem, i) => (
            <SidebarItem
              key={i}
              item={subitem}
              isActive={this.routeActive(subitem.path)}
            />
          ))}
        </SidebarSubItem>
      ];
    } else {
      return null; // unrecognized item
    }
  };
  render() {
    return (
      <aside className="aside-container">
        {/* START Sidebar (left) */}
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            {/* START sidebar nav */}
            <ul className="sidebar-nav">
              {/* START user info */}
              <li className="has-user-block">
                <SidebarUserBlock />
              </li>
              {/* END user info */}

              {/* Iterates over all sidebar items */}
              {Menu.map(this.mapMenuItem)}
            </ul>
            {/* END sidebar nav */}
          </nav>
        </div>
        {/* END Sidebar (left) */}
      </aside>
    );
  }
}

Sidebar.propTypes = {
  actions: PropTypes.object,
  settings: PropTypes.object,
  item: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.object
  }),
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
    path: PropTypes.shape({ indexOf: PropTypes.func }),
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({ settings: state.settings });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(withRouter(Sidebar)));
