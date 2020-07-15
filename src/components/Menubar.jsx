import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Nav, Navbar, NavbarToggler, Collapse, NavItem } from "reactstrap";
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
      <>
        <span className="thank-you">Thank you for your support</span>
        <div className="menubar-nav">
          <Navbar light expand="md">
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav className="menubar-menu" navbar>
                <NavItem>
                  <NavLink
                    to="/expert/appointments"
                    className="menubar-link"
                    activeClassName="active"
                    activeStyle={{
                      borderBottom: "2px solid #0b6283",
                      color: "inherit"
                    }}
                  >
                    Appointments
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/expert/addslots"
                    className="menubar-link"
                    activeClassName="active"
                    activeStyle={{
                      borderBottom: "2px solid #0b6283",
                      color: "inherit"
                    }}
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
                    to="/expert/profile"
                    className="menubar-link"
                    activeClassName="active"
                    activeStyle={{
                      borderBottom: "2px solid #0b6283",
                      color: "inherit"
                    }}
                  >
                    Your Profile{" "}
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default withRouter(Menubar);
