import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ExpertCard from "./ExpertCard";
import API from "../API";

import isEmpty from '../utils/isEmpty';

class ExpertsPage extends Component {
  constructor(props) {
    super();
    this.state = {
      experts: {},
      sortBy: "institution",
		};

		this.setSort=this.setSort.bind(this)
	}

  async componentDidMount() {
    const experts = await API.get("/expert/getexperts");
    this.setState({
      experts: experts.data
		});
		this.setSort=this.setSort.bind(this);
  }

  setSort(e) {
	this.setState({
		sortBy : e.target.id,
	})
  }

  render() {
    if (isEmpty(this.state.experts)) {
      return null;
		}
		const sortParam = this.state.experts[this.state.sortBy];
    return ( 
      <div style={{ minHeight: "100vh" }}>
				<div className="sortBy">
					<span id='expertise' onClick={this.setSort}>Expertise</span>
					<span id='institution' onClick={this.setSort}>Institution</span>
					<span id='exam' onClick={this.setSort}>Exam</span>
				</div>
				{sortParam===undefined ? null : 
				<div>
					{Object.keys(sortParam).map(param => 
						<div>
							<h3>{param}</h3>
							{sortParam[param].map(expert => 
								<ExpertCard expert={expert} />
							)}
						</div>
					)}
				</div>
				}
			</div>
    );
  }
}

export default withRouter(ExpertsPage);
