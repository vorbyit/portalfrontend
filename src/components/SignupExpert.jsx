import React, { Component } from 'react'
import API from '../API';

export default class SignupExpert extends Component {
	constructor() {
		super()
		this.state = {
			name : '',
			email : '',
			username : '',
			password : '',
			cnfpassword : '',
			mobile : '',
			desc : '',
			institution : '',
			branch : '',
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);	
	}
	
	handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
	}

	async handleSubmit(evt) {
		evt.preventDefault();
    try {
      const newUser = this.state;
	  const { data } = await API.post('auth/register', newUser);
	  console.log(data);
      this.props.updateUser(data);
      this.props.history.push('/');
    } catch (error) {
      console.log(error)
    }
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="name" 
						placeholder="name"
						id="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<input 
						type="email" 
						name="email" 
						placeholder="email"
						id="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="username" 
						placeholder="username"
						id="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<input 
						type="password" 
						name="password" 
						placeholder="password"
						id="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input 
						type="password" 
						name="cnfpassword" 
						placeholder="cnfpassword"
						id="cnfpassword"
						value={this.state.cnfpassword}
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="mobile" 
						placeholder="mobile"
						id="mobile"
						value={this.state.mobile}
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="desc" 
						placeholder="desc"
						id="desc" 
						value={this.state.desc} 
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="institution" 
						placeholder="institution"
						id="institution" 
						value={this.state.institution} 
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="branch" 
						placeholder="branch"
						id="branch" 
						value={this.state.barnch} 
						onChange={this.handleChange}
					/>
					<button type="submit">SUBMIT</button>
				</form>
			</div>
		)
	}
}
