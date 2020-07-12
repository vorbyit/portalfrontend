import React, { Component } from "react";
import logo from "../public/logo2.svg";
import { NavLink, withRouter } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavbarText,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
} from "reactstrap";
import "../css/FilterBar.css";

class FilterBar extends Component {
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
      <div className="filterbar-nav">
        <Navbar light expand="md">
          <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <NavbarText>
              <img className="filterby-icon" src={logo} alt="logo" />
              Filter by
            </NavbarText>
            <Nav className="filterbar" navbar>
              {this.props.filters.map((filter) => (
                <NavItem
                  className="filterbar-item"
                  id={filter}
                  onClick={this.props.sortBy}
                >
                  {filter[0].toUpperCase() + filter.slice(1)}
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(FilterBar);
