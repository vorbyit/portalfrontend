import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import "../css/Menubar.css";


class Menubar extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  render() {
    return (


      <div>
        <div className="txt">Thankyou for your support</div>
        <div className="nav1">
      <Navbar light expand="md">
              <NavbarToggler onClick={this.toggleNav} />
              <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav className="menu" navbar>
                  <NavItem>
                  <NavLink to="/appointments" className="a" activeClassName="active">
                Appointments
              </NavLink>
                  </NavItem >
                  <NavItem>
                  <NavLink to="/addslots" className="a" activeClassName="active">
                Time Slots
              </NavLink>
                  </NavItem>
                  <NavItem>
                  <NavLink to="/nolink" className="a" activeClassName="active">
                Messaging
              </NavLink>
                  </NavItem >
                  <NavItem>
                  <NavLink to="/profile" className="a" activeClassName="active">
                Your Profile{" "}
              </NavLink>
                  </NavItem>
                  </Nav>
              </Collapse>
      </Navbar>
      </div>
  </div>
    );
  }
}

export default withRouter(Menubar);
