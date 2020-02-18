import React, { Component } from 'react'
import ExpertCard from './ExpertCard';
import API from '../API';

export default class ExpertsPage extends Component {
	constructor(props) {
		super()
		this.state={
			experts : [],
		}
	}

	async componentDidMount() {
		const experts = await API.get('/expert/getexperts');
		this.setState({
			experts: experts.data
		});
	}

	comp

	render() {
		console.log(this.state.experts)
		if(this.state.experts.length === 0) {
			return(null);
		}
		return (
			<div>
				{this.state.experts.map((expert) => 
					<ExpertCard expert={expert}/>
				)}
			</div>
		)
	}
}
