 import React, { Component } from 'react'
import API from '../API';	
import UserCard from './UserCard';
import isEmpty from '../utils/isEmpty';

export default class ExpertApptPage extends Component {
	constructor() {
		super()
		this.state={
			upcoming : [],
			past : [],
		}
	}
	
	async componentDidMount() {
		try {
			const { data } = await API.get('/expert/appointments');
			const upcoming = [];
			const past = [];
			const d = new Date();
			const date = d.toISOString().split('T')[0]
			const time = d.toTimeString();

			for(let i=0; i<data.length; i++){
				if (data[i].slot.Date.split('T')[0]>date 
				|| (data[i].slot.Date.split('T')[0]===date 
				&& data[i].slot.slot > time)) {
				  upcoming.push(data[i])
				}
				else {
				  past.push(data[i])
				}
			}
			this.setState({ past, upcoming })
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
		return (
			<div>
				<div>
					<h5>Upcoming Appointments</h5>
					{this.state.upcoming.map((appt) => 
						<UserCard appt={appt.user} slot={appt.slot}/>
					)}
				</div>
				<div>
					<h5>Past Appointments</h5>
					{this.state.past.map((appt) => 
						<UserCard appt={appt.user} slot={appt.slot}/>
					)}
				</div>
			</div>
		)
	}
}
