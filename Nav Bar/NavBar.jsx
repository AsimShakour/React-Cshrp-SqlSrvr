import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./NavBar.module.css";
import "./Home.module.css";

//Notes for styling. this is the nav bar component its mostly using the deeppink. Hover effects need to be added. Many items will show up twice once in collapsed mode and not collapsed.
//Bug: classnames with asim... are not working. at next opportunity to fix this. 

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
            <div className="asimHomeNavBar brand-logo Navmarg" >
              <a style={{ color: "deeppink" }} href="/"><div className="fa fa-heart fa-2x" /></a>
            </div>
            <div className="brand-logo-collapsed">
              <a style={{ color: "deeppink" }} href="/"><div className="fa fa-heart fa-2x" /></a>
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
                    <DropdownItem><a style={{ color: "deeppink" }} href="/events">Events</a></DropdownItem>
                    <DropdownItem><a style={{ color: "deeppink" }} href="/vendors">Craft Vendors</a></DropdownItem>
                    <DropdownItem><a style={{ color: "deeppink" }} href="/promoters">Event Promoters</a></DropdownItem>
                    <DropdownItem><a style={{ color: "deeppink" }} href="/venues">Venue Owners</a></DropdownItem>
                    <DropdownItem><a style={{ color: "deeppink" }} href="/contactus">Contact Us</a></DropdownItem>
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
              <a className=" nav-link" href="/events">
                <em style={{ color: "deeppink" }} className="">Events</em>
              </a>
            </li>
            <li className="nav-item">
              <a className=" nav-link" href="/vendors">
                <em style={{ color: "deeppink" }} className="">Craft Vendors</em>
                {/* <em className="icon-magnifier" /> */}
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a className=" nav-link" href="/promoters">
                <em style={{ color: "deeppink" }} className="">Event Promoters</em>
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a className=" nav-link" href="/venues">
                <em style={{ color: "deeppink" }} className="">Venue Owners</em>
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a className=" nav-link" href="/contactus">
                <em style={{ color: "deeppink" }} className="">Contact Us</em>
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
