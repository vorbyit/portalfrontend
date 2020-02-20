 import React, { Component } from 'react'
import API from '../API';	
import UserCard from './UserCard';
import isEmpty from '../utils/isEmpty';

export default class AppointmentPage extends Component {
	constructor() {
		super()
		this.state={
			appointments : undefined,
		}
	}
	
	async componentDidMount() {
		try {
			const appointments = await API.get('/expert/appointments');
			console.log(appointments);
			this.setState({ appointments : appointments.data});
		} catch (error) {
			console.log(error);
		}	
	}

	render() {
		const d = new Date();
		// console.log(d.toISOString())
		const date = d.toISOString().split('T')[0]
		const time = d.toTimeString();
		console.log(this.state.appointments)
		if(this.state.appointments === undefined){
			return(null);
		}
		return (
			<div>
				<div>
					<h5>Upcoming Appointments</h5>
					{this.state.appointments.map((appt) => 
						(appt.slot.Date.split('T')[0]>date || 
						(appt.slot.Date.split('T')[0]===date && appt.slot.slot > time) ?
							<UserCard appt={appt.user} slot={appt.slot}/>
							: null
						)
					)}
				</div>
				<div>
				<h5>Past Appointments</h5>
				{this.state.appointments.map((appt) => 
					(appt.slot.Date.split('T')[0]<date || 
					(appt.slot.Date.split('T')[0] === date && appt.slot.slot < time) ?
						<UserCard appt={appt.user} slot={appt.slot}/>
						: null
					)
				)}

				{this.state.appointments.map((appt) => <div>
					{console.log(appt.slot.Date.split('T')[0],date, appt.slot.Date.split('T')[0]<date)}{
					 console.log(appt.slot.slot,time, appt.slot.slot>time)}
					 </div>)}
				</div>
			</div>
		)
	}
}
