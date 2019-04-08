import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./Home.module.css";
import "./NavBar.module.css";

//Notes for styling. this is the nav bar component its mostly using the green. Hover effects need to be added. Many items will show up twice once in collapsed mode and not collapsed.
//Bug: classnames that start with asim... are not working. at next opportunity to fix this. 

class NavBar extends React.Component {
  state = {
    isOpen: false
  };
  handleBurgerClick = () => {
    let isOpen = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  };
  render() {
    return (
      <div className="asimHomeNavBar topnavbar-wrapper">
        {" "}
        {/* <!-- START Top Navbar--> */}
        <nav className="asimHomeNavBar navbar topnavbar">
          {/* <!-- START navbar header--> */}
          <div className="asimHomeNavBar navbar-header">
            {/* <a className="navbar-brand" href="#/"> */}
            <div className="brand-logo Navmarg">
              <img
                className="img-fluid logo-collapsed"
                src="https://sabio-s3.s3.us-west-2.amazonaws.com/sellersplace/d6892b9b-381a-44f7-b99c-98f2d23190f2_SLogo_200x91.png"
                alt="Seller's Place Logo"
                style={{ height: "31px", objectFit: "contain" }}
              />
            </div>
            <div className="brand-logo-collapsed ">
              <img
                className="img-fluid logo-collapsed"
                src="https://sabio-s3.s3.us-west-2.amazonaws.com/sellersplace/d6892b9b-381a-44f7-b99c-98f2d23190f2_SLogo_200x91.png"
                alt="Seller's Place Logo"
              />
              {/* <div className="fa fa-heart fa-2x" /> */}
            </div>
          </div>
          {/* <!-- END navbar header--> */}
          {/* <!-- START Left navbar--> */}
          <ul className="navbar-nav mr-auto flex">
            <div className="dropMobile">
              <li className="nav-item">
                {/* <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops--> */}

                {/* <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.--> */}

                <Dropdown
                  className="posRight"
                  isOpen={this.state.isOpen}
                  toggle={this.handleBurgerClick}
                >
                  <DropdownToggle className="transparent">
                    <em className="fas fa-bars" />
                  </DropdownToggle>
                  <DropdownMenu className="wide">
                    <DropdownItem><a style={{}} href="/events">Events</a></DropdownItem>
                    <DropdownItem><a style={{}} href="/vendors">Craft Vendors</a></DropdownItem>
                    <DropdownItem><a style={{}} href="/promoters">Event Promoters</a></DropdownItem>
                    <DropdownItem><a style={{}} href="/venues">Venue Owners</a></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </div>
          </ul>

          {/* <!-- START Right Navbar--> */}
          <ul className="navbar-nav flex-row">
            {/* <!-- Search icon--> */}
            {/* <!-- Fullscreen (only desktops)--> */}
            <li className="nav-item d-none d-md-block">
              <a className="asimHomeNavBar nav-link" href="/events">
                <em style={{}} className="asimHomeNavBar">Events</em>
              </a>
            </li>
            <li className="nav-item">
              <a className="asimHomeNavBar nav-link" href="/vendors">
                <em style={{}} className="asimHomeNavBar">Craft Vendors</em>
                {/* <em className="icon-magnifier" /> */}
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a className="asimHomeNavBar nav-link" href="/promoters">
                <em style={{}} className="asimHomeNavBar">Event Promoters</em>
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a className="asimHomeNavBar nav-link" href="/venues">
                <em style={{}} className="asimHomeNavBar">Venue Owners</em>
              </a>
            </li>
            {/* <!-- START Alert menu--> */}

            {/* <!-- END Alert menu--> */}
            {/* <!-- START Offsidebar button--> */}
            {/* <!-- END Right Navbar--> */}
            {/* <!-- START Search form--> */}
            <form className="navbar-form" role="search" action="search.html">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Type and hit enter ..."
                />
                <div
                  className="fas fa-times navbar-form-close"
                  data-search-dismiss=""
                />
              </div>
              <button className="d-none" type="submit">
                Submit
              </button>
            </form>
            {/* <!-- END Search form--> */}
          </ul>
        </nav>
        {/* <!-- END Top Navbar--> */}
      </div >
    );
  }
}

export default NavBar;
