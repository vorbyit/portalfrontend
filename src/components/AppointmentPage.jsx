import React, { Component } from 'react'
import API from '../API';	
import UserCard from './UserCard';
import isEmpty from '../utils/isEmpty';

export default class AppointmentPage extends Component {
	constructor() {
		super()
		this.setState={
			appointments : undefined,
		}
	}
	
	async componentDidMount() {
		try {
			const appointments = await API.get('/expert/appointments');
			this.setState({ appointments : appointments.data});
		} catch (error) {
			console.log(error);
		}	
	}

	render() {
		return (
			<div>
				{this.state.appointments.map((appt) => 
					<UserCard appt={appt}/>
				)}
			</div>
		)
	}
}
