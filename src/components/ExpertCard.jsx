import React, { Component } from 'react'
import API from '../API';
import isEmpty from '../utils/isEmpty';

export default class ExpertCard extends Component {
	constructor(props) {
		super(props);
		const { expert } = props
		this.state={
			currDate : isEmpty(expert.slots) ? null : Object.keys(expert.slots)[0],
			bookSlot : undefined,
		}
		this.setDate=this.setDate.bind(this);
		this.bookSlot=this.bookSlot.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	setDate(evt) {
		const date = evt.target.id;
		this.setState({
			currDate : date,
		})
	}

	bookSlot(evt) {
		const slot = evt.target.id;
		if(this.props.expert.slots[this.state.currDate][slot] !== null){
			console.log("BOOKED")
		}
		else {
			this.setState({
				bookSlot : slot,
			})
		}
	}

	handleSubmit(evt) {
		evt.preventDefault();
		console.log(this.state)
		const slot = API.post('/slots/bookslot',{
			date : this.state.currDate,
			slot : this.state.bookSlot,
			expertId : this.props.expert._id,
		})
	}

	render() {
		return (
			<div>
				{this.props.expert.pic}
				{this.props.expert.name}
				{this.props.expert.university}
				{this.props.expert.branch}
				<div>Description</div>
				{this.props.expert.bio}
				<div>Slots</div>
				{isEmpty(this.props.expert.slots) ? null :
				<div>
					{Object.keys(this.props.expert.slots[this.state.currDate]).map((slot) => 
						<div
							id={slot}
							onClick={this.bookSlot}
						>
							{slot}
						</div>
					)}
					Dates
					{Object.keys(this.props.expert.slots).map((date) => 
						<div
							id={date} 
							onClick={this.setDate}
						>
							{date}
						</div>
					)}
					</div>
				}
				<button onClick={this.handleSubmit}>BOOK SLOT</button>
			</div>
		)
	}
}
