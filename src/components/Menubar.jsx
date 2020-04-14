import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import API from "../API";
import logo from "../public/vorby-logo.png";
import "../css/Menubar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class Menubar extends Component {
  render() {
    return (
      <div>
        <div className="menu">
          <div className="txt">Thankyou for your support</div>
          <ul>
            <li>
              <NavLink to="/appointments" className="a active1">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/addslots" className="a active2">
                Time Slots
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="a active3">
                Messaging
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="a active4">
                Your Profile{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Menubar);
