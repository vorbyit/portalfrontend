import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FilterBar from "./FilterBar";
import ExpertCard from "./ExpertCard";
import getCurrentUser from '../utils/getCurrentUser';
import API from "../API";
import "../css/carousel-styles.css";
import isEmpty from "../utils/isEmpty";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

let selectedFilter = null;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class ExpertsPage extends Component {
  constructor(props) {
    super();
    this.state = {
      experts: {},
      sortBy: "institution",
      user : {},
      faved : [],
      slot_ready : []
    };
    this.setSort = this.setSort.bind(this);
  }

  async componentDidMount() {
    console.log("00:00"<"00:03");
    console.log("00:30">"00:03");
    const userdata = await getCurrentUser();
    this.setState({user:userdata})
    const userId = userdata._id;
    const faved = await API.post('/expert/faved',{
      userId:userId
    })
    this.setState({faved:faved.data});

    const slot_ready = await API.post('/expert/ready',{
      userId:userId
    })
    console.log(slot_ready)
    const myexperts = slot_ready.data.filter(expert => 
      expert!=="Nothing"
    )[0];
    let msgexperts = [];
    for (let i in myexperts){
      msgexperts.push(i);
    }
    console.log(msgexperts);
    this.setState({slot_ready:msgexperts});

    const experts = await API.get("/expert/getexperts");
    this.setState({
      experts: experts.data,
    });
    this.setSort = this.setSort.bind(this);

  }

  setSort(e) {
    e.preventDefault();
    if (selectedFilter) {
      selectedFilter.classList.remove("filter-selected");
    }
    this.setState({ sortBy: e.target.id });
    e.target.classList.add("filter-selected");
    selectedFilter = e.target;
  }

  render() {
    if ((isEmpty(this.state.experts))&&(isEmpty(this.state.user))&&(isEmpty(this.state.faved))&&(isEmpty(this.state.slot_ready))) {
      return null;
    }
    console.log(this.state.user);
    console.log(this.state.faved);
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
        <FilterBar
          filters={["expertise", "institution", "exam"]}
          sortBy={this.setSort}
        />
        {sortParam === undefined ? null : (
          <div>
            {Object.keys(sortParam).map((param) => (
              <div>
                <h3 className="param">{param}</h3>
                <br />

                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
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
                    <ExpertCard appt={false} expert={expert} user={this.state.user} faved={!this.state.faved.includes(expert._id)} slot_ready={this.state.slot_ready.includes(expert._id)} />
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
