import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../API';
import logo from '../public/vorby-logo.png';
import '../css/navbar.css';

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
              <button onClick={this.toggleAuthBar}>
                <i class="fas fa-user"></i>
              </button>
            }
          </div>
          {
            (!this.state.authBar) ? null :
            <div>
              <NavLink className="nav-item" to="/auth/profile" activeClassName="active">
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
