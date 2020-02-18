import React, { Component } from 'react'
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
				<button onClick={this.onLogout}>LOGOUT</button>
			</div>
		)
	}
}
