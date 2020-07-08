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
      <React.Fragment>
        <div className="filterbar-nav">
          <Navbar light expand="md">
            <NavbarToggler
              className="filterby-container"
              onClick={this.toggleNav}
            >
              <img className="filterby-icon" src={logo} alt="logo" />
              <NavbarText>Filter by</NavbarText>
            </NavbarToggler>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              {!this.state.isNavOpen ? (
                <span>
                  <img className="filterby-icon" src={logo} alt="logo" />
                  Filter by
                </span>
              ) : null}
              <Nav className="FilterBar" navbar>
                {this.props.filters.map((filter) => (
                  <NavItem
                    className="a"
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
      </React.Fragment>
    );
  }
}
export default withRouter(FilterBar);
