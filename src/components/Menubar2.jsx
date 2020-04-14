import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import API from "../API";
import logo from "../public/vorby-logo.png";
import "../css/Menubar2.css";
import logo2 from "../public/logo2.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class Menubar2 extends Component {
  render() {
    return (
      <div>
        <div className="menu">
          {/* <div className="txt">Thankyou for your support</div> */}
          <ul>
            <li>
              <img className="logo1" src={logo2}></img>
            </li>
            <li className="filter">Filter by</li>
            <li>
              <NavLink to="/addslots" className="a active2">
                Wishlist
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="a active3">
                Current Advisors
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="a active4">
                Past Advisors{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Menubar2);
