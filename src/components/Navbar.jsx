import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../API';
import logo from '../public/vorby-logo.png';
import '../css/navbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default class Navbar extends Component {
  constructor() {
	super();
	this.state={
		authBar : false,
	}
	this.onLogout = this.onLogout.bind(this);
	this.toggleAuthBar=this.toggleAuthBar.bind(this)
  }

  async onLogout() {
    const { data } = await API.get('/auth/logout');
    if(data.success) {
      this.props.updateUser(undefined);
    } else {
      console.log("ERROR LOGGING OUT");
    }
  }

  toggleAuthBar() {
	  this.setState({
		  authBar : !this.state.authBar,
	  })
  }

  render() {
    return (
      <div>
        {/* {this.props.user.username} */}
        <div id="navbar">
          <div className="logo">
            <img src={logo} alt="Vorby Logo" />
          </div>
          <div className="list-wrap">
            <NavLink className="nav-item" to="/" activeClassName="active">
              Vision
            </NavLink>
            <NavLink className="nav-item" to="/experts" activeClassName="active">
              Advisors
            </NavLink>
            <NavLink className="nav-item" to="/" activeClassName="active">
              Project Udaan
            </NavLink>
            <NavLink className="nav-item" to="/" activeClassName="active">
              Contact Us
            </NavLink>
            {this.props.user === undefined ? 
              <NavLink className="nav-item" to="/login" activeClassName="active">
                Login
              </NavLink> :
              <button className="btn" onClick={this.toggleAuthBar}>
                <a href="/"><FontAwesomeIcon className="fa" style={{width:'1.875em'}} icon={ faUser }/></a>
                <div className="dropdown-content" >
                  <a href="#">Your Profile</a>
                  <a href="#">Your Advisors</a>
                  <a href="#">Message</a>
                  <a href="#">Logout</a>
                </div>
              </button>
            }
          </div>
          {
            (!this.state.authBar) ? null :
            <div>
              <NavLink className="nav-item" to="/profile" activeClassName="active">
                Your Profile
              </NavLink>
              <NavLink className="nav-item" to="/appointments" activeClassName="active">
                {this.props.user !== undefined && this.props.user.type === "EXPERT" ? 
                  <span>Appointments</span> : 
                  <span> Your Advisors</span> 
                }
              </NavLink>
              <NavLink className="nav-item" to="/" activeClassName="active">
                Message
              </NavLink>
              <div onClick={this.onLogout}>LOGOUT</div>
            </div>
          }
          
        </div>
      </div>
    );
  }
}
