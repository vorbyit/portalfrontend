import React, { Component } from 'react'

export default class UserCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{this.props.user.name}
				{this.props.user.education}
				{this.props.slot.date}
				{this.props.slot.time}
				<button>Message</button>
			</div>
		)
	}
}
