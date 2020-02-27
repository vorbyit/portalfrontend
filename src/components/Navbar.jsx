import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import API from '../API'

export default class Navbar extends Component {
	constructor(){
		super()
		this.onLogout=this.onLogout.bind(this);
	}

	async onLogout() {
		const { data } = await API.get('/auth/logout');
	}

	render() {
		return (
			<div>
				{/* {this.props.user.username} */}
				<NavLink className="nav-item" to="/" activeClassName="active">Vision</NavLink>
				<NavLink className="nav-item" to="/experts" activeClassName="active">Advisors</NavLink>
				<NavLink className="nav-item" to="/" activeClassName="active">Project Udaan</NavLink>
				<NavLink className="nav-item" to="/" activeClassName="active">Contact Us</NavLink>
				<NavLink className="nav-item" to="/dashboard" activeClassName="active">Login</NavLink>
				<NavLink className="nav-item" to="/dashboard" activeClassName="active">Signup</NavLink>
				<button onClick={this.onLogout}>LOGOUT</button>
			</div>
		)
	}
}
