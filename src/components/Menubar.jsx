import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
} from "reactstrap";
import "../css/Menubar.css";

class Menubar extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  render() {
    return (
      <div className="menubar-nav">
        <Navbar light expand="md">
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav className="menubar-menu" navbar>
              <NavItem>
                <NavLink
                  to="/appointments"
                  className="menubar-link"
                  activeClassName="active"
                >
                  Appointments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/addslots"
                  className="menubar-link"
                  activeClassName="active"
                >
                  Time Slots
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/nolink"
                  className="menubar-link"
                  activeClassName="active"
                >
                  Messaging
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/profile"
                  className="menubar-link"
                  activeClassName="active"
                >
                  Your Profile{" "}
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Menubar);
