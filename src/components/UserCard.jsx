import React, { Component } from 'react'
import API from '../API';

export default class UserCard extends Component {
	constructor(props) {
		super(props);
		this.onApprove=this.onApprove.bind(this);
		this.onReject=this.onReject.bind(this);
	}

	async onApprove(e) {
		try {
			const approved = await API.post('slots/approve', {
				id : e.target.id,
			});
			console.log(approved);
			if(approved.status === 200) {
				this.props.approveSlot(approved.data._id);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async onReject(e) {
		try {
			const rejected = await API.post('slots/reject', {
				id : e.target.id,
			});
			if(rejected.status === 200) {
				this.props.rejectSlot(rejected.data._id);
			}
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const d = Date()
		return (
			<div>
				<div>{this.props.appt.pic}</div>
				<div>{this.props.appt.name}</div>
				<div>{this.props.appt.education}</div>
				<div>{this.props.slot.Date.split('T')[0]}</div>
				<div>{this.props.slot.slot}</div>
				{!this.props.slot.approved ? this.props.user.type !== "EXPERT" ? 
					<div>APPROVAL PENDING</div>
				: 
					<div>
						<button id={this.props.slot._id} onClick={this.onApprove}>Approve</button>
						<button id={this.props.slot._id} onClick={this.onReject}>Reject</button>
					</div> :
					<button>Message</button>
				}
			</div>
		)
	}
}
