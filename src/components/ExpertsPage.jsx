import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FilterBar from "./FilterBar";
import ExpertCard from "./ExpertCard";
import ExpandedExpertCard from "./ExpandedExpertCard";
import getCurrentUser from "../utils/getCurrentUser";
import API from "../API";
import "../css/ExpertsPage.css";
import "../utils/groupExperts";
import isEmpty from "../utils/isEmpty";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import groupExperts from "../utils/groupExperts";

let selectedFilter = null,
  expertsUngrouped = null,
  index = null;

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
    this.myRef = React.createRef();
    this.state = {
      experts: {},
      sortBy: "institution",
      user: {},
      faved: [],
      slot_ready: [],
      expand: false,
    };
    this.setSort = this.setSort.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  async componentDidMount() {
    console.log("00:00" < "00:03");
    console.log("00:30" > "00:03");
    const userdata = await getCurrentUser();
    const userId = userdata._id;
    const slot_ready = await API.post("/expert/ready", {
      userId: userId,
    });
    console.log(slot_ready);
    const myexperts = slot_ready.data.filter(
      (expert) => expert !== "Nothing"
    )[0];
    let msgexperts = [];
    for (let i in myexperts) {
      msgexperts.push(i);
    }
    console.log(msgexperts);

    expertsUngrouped = await API.get("/expert/getexperts");
    expertsUngrouped = expertsUngrouped.data;
    expertsUngrouped.forEach((expert) => (expert.expand = false));
    console.log(expertsUngrouped);
    this.setState({
      user: userdata,
      faved: faved.data,
      experts: groupExperts(expertsUngrouped),
      slot_ready: msgexperts,
    });
  }

  toggleExpansion(e, expertId) {
    e.preventDefault();
    index = expertsUngrouped.findIndex((expert) => expert._id === expertId);
    expertsUngrouped[index].expand = true;
    this.setState({ expand: true });
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
    if (
      isEmpty(this.state.experts) &&
      isEmpty(this.state.user) &&
      isEmpty(this.state.faved) &&
      isEmpty(this.state.slot_ready)
    ) {
      return null;
    }
    const sortParam = this.state.experts[this.state.sortBy];
    return (
      <React.Fragment>
        <div ref={this.myRef} className="expansion-area">
          <ExpandedExpertCard
            showCard={this.state.expand}
            expert={expertsUngrouped[index]}
            appt={false}
            user={this.state.user}
          />
        </div>
        <div style={{ minHeight: "100vh" }}>
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
                      <ExpertCard
                        appt={false}
                        expert={expert}
                        user={this.state.user}
                        faved={!this.state.faved.includes(expert._id)}
                        slot_ready={this.state.slot_ready.includes(expert._id)}
                        trigger={this.toggleExpansion}
                      />
                    ))}
                  </Carousel>
                </div>
              ))}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ExpertsPage);
