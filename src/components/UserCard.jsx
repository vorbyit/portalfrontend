import React, { Component } from 'react'

export default class UserCard extends Component {
	constructor(props) {
		super(props)
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
				<button>Message</button>
			</div>
		)
	}
}
