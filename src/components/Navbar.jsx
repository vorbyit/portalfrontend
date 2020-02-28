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
			<button onClick={this.toggleAuthBar}>
				<i class="fas fa-user"></i>
			</button>
          </div>
			{ !this.state.authBar ? null :
			<div>
				<NavLink className="nav-item" to="/login" activeClassName="active">
				Login
				</NavLink>
				<NavLink className="nav-item" to="/signup" activeClassName="active">
				Signup
				</NavLink>
				<button onClick={this.onLogout}>LOGOUT</button>
			</div>
			}
        </div>
      </div>
    );
  }
}
