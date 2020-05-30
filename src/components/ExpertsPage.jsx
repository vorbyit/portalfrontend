import React, { Component } from "react";
import { withRouter } from "react-router-dom";


import FilterBar from './FilterBar';
import ExpertCard from "./ExpertCard";
import API from "../API";

import isEmpty from "../utils/isEmpty";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


class ExpertsPage extends Component {
  constructor(props) {
    super();
    this.state = {
      experts: {},
      sortBy: "institution",
    };


    this.setSort = this.setSort.bind(this);
  }


    this.setSort = this.setSort.bind(this);
  }
  
  async componentDidMount() {
    const experts = await API.get("/expert/getexperts");
    this.setState({
      experts: experts.data,
    });
    this.setSort = this.setSort.bind(this);
  }

  setSort(e) {
    this.setState({
      sortBy: e.target.id,
    });
  }

  render() {
    if (isEmpty(this.state.experts)) {
      return null;
    }
    const sortParam = this.state.experts[this.state.sortBy];
    return (
      <div style={{ minHeight: "100vh" }}>
        {/* <div className="sortBy">
          <span id="expertise" onClick={this.setSort}>
            Expertise
          </span>
          <span id="institution" onClick={this.setSort}>
            Institution
          </span>
          <span id="exam" onClick={this.setSort}>
            Exam
          </span>
        </div> */}
        <FilterBar filters={['expertise', 'institution', 'exam']} sortBy={this.setSort}/>
        {sortParam === undefined ? null : (
          <div>
            {Object.keys(sortParam).map((param) => (

              <div >
                <h3 className="param">{param}</h3><br/>
                
                <Carousel 
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
                {sortParam[param].map((expert) => (
                  
                  <ExpertCard appt={false} expert={expert}  />
                  
                ))}
                </Carousel>
              

              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ExpertsPage);
