import React, { Component } from 'react'
import API from '../API';
import isEmpty from '../utils/isEmpty';
import '../css/expertApptCard.css'
import { withRouter } from "react-router-dom";

import defaultPic from '../public/defaultpic.png'

 class ExpertApptCard extends Component {
	handleSubmit(evt) {
		evt.preventDefault();
		console.log(this.state)
		if(this.state.showDetails === false ) {
			this.setState({
				showDetails : true
			})
		}
		
		
	}

	render() {
		const { expert } = this.props

		return (
			<div>
                <div class="Expert-Card">
					<div class="info">
					<img src="/static/media/defaultpic.b5e980bc.png" alt="profpic"/>
						<div>
							<h3>Mihir Pavuskar</h3>
							<h3>12th Grade Student</h3>
							<h3>Date: ...</h3>
							<h3>Time Slot</h3>
							<button onClick={this.handleSubmit}>Message</button>
						</div>
						
						
            </div>
			<div class="details">
				<button>X</button>
				<div class="description">
					<h1>Description</h1>
					<p></p>
					</div>
					<div class="form">
						<div class="duration">
							<h2>Select Call Duration</h2>
							<div class="duration-input">
								<input type="radio" name="duration" id="30min" value="30" checked=""/>
								<label for="30min">
									 <span>30 min&nbsp;
										 </span> 
										 <span>100 Rs</span>
										 </label>
										 <input type="radio" name="duration" id="60min" value="60"/>
										 <label for="60min"> <span>60 min&nbsp;
											 </span>
											  <span>200 Rs</span>
											  </label>
											  </div>
											  </div>
											  <div>
												  </div>
												  </div>
												  <div>Slots
													  </div>
													  </div>
	</div>
	</div>
		)
	}
}

export default withRouter(ExpertApptCard);