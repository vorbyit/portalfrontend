import React, { Component } from 'react'
import API from '../API';

export default class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			name : '',
			email : '',
			username : '',
			password : '',
			cnfpassword : '',
			mobile : '',
		}
		this.handleChange=this.handleChange.bind(this);
	}
	
	handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
	}

	async handleSubmit(evt) {
		evt.preventDefault();
    try {
      const newUser = this.state;
      const { data } = await API.post('auth/register', newUser);
      // this.props.updateUser(data);
      this.props.history.push('/');
    } catch (error) {
      console.log(error)
    }
	}

	render() {
		return (
			<div>
				<form>
					<input 
						type="text" 
						name="name" 
						id="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<input 
						type="email" 
						name="email" 
						id="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="username" 
						id="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<input 
						type="password" 
						name="password" 
						id="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input 
						type="password" 
						name="cofpassword" 
						id="cofpassword"
						value={this.state.cofpassword}
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="mobile" 
						id="mobile"
						value={this.state.mobile}
						onChange={this.handleChange}
					/>
				</form>
			</div>
		)
	}
}
