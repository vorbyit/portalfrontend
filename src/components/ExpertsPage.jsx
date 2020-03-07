import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ExpertCard from './ExpertCard';
import API from '../API';

class ExpertsPage extends Component {
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

export default  withRouter(ExpertsPage)