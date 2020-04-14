import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "../css/Menubar.css";


class Menubar extends Component {
  render() {
    return (
      <div>
        <div className="menu">
          <div className="txt">Thankyou for your support</div>
          <ul>
            <li>
              <NavLink to="/appointments" className="a" activeClassName="active">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/addslots" className="a" activeClassName="active">
                Time Slots
              </NavLink>
            </li>
            <li>
              <NavLink to="/nolink" className="a" activeClassName="active">
                Messaging
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="a" activeClassName="active">
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
