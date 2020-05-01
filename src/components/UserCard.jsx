import React, { Component } from 'react'
import API from '../API';

import "../css/UserCard.css"

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
		const d = Date();
		const userPic = this.props.appt.pic;
		return (
		  <div className="user-card-container">
			<div className="user-image">
			  <div className="image">
				  <img src={userPic} alt="UserPic"/>
			  </div>
			</div>
			<div className="content">
			  <div className="user-info">
				<div>{this.props.appt.name}</div>
				<div>{this.props.appt.education}</div>
			  </div>
			  <div className="slot-info">
				<div>{this.props.slot.Date.split("T")[0]}</div>
				<div>{this.props.slot.slot}</div>
			  </div>
			  {!this.props.slot.approved ? (
				this.props.user.type !== "EXPERT" ? (
				  <div>APPROVAL PENDING</div>
				) : (
				  <div className="btn-panel">
					<button
					  id={this.props.slot._id}
					  className="btn btn-approve"
					  onClick={this.onApprove}
					>
					  Approve
					</button>
					<button
					  id={this.props.slot._id}
					  className="btn btn-reject"
					  onClick={this.onReject}
					>
					  Reject
					</button>
				  </div>
				)
			  ) : (
				<div className="btn-panel">
				  <button className="btn btn-success">Message</button>
				</div>
			  )}
			</div>
		  </div>
		);
	}	
}
