import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../API";
import UserCard from "./UserCard";
import ExpertApptCard from "./ExpertApptCard";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";

class ExpertApptPage extends Component {
  constructor() {
    super();
    this.state = {
      unapproved: [],
      upcoming: [],
      past: [],

      sortBy: "upcoming",

    };
    this.approveSlot = this.approveSlot.bind(this);
    this.rejectSlot = this.rejectSlot.bind(this);
  }

  async componentDidMount() {
    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        } else if (currentUser.type !== "EXPERT") {
          console.log("Experts only allowed");
          this.props.history.push("/experts");
        }
      }
      const { data } = await API.get("/expert/appointments");
      const upcoming = [];
      const past = [];
      const unapproved = [];
      const d = new Date();
      const date = d.toISOString().split("T")[0];
      const time = d.toTimeString();

      for (let i = 0; i < data.length; i++) {
        if (!data[i].slot.approved) {
          unapproved.push(data[i]);
        } else if (
          data[i].slot.Date.split("T")[0] > date ||
          (data[i].slot.Date.split("T")[0] === date && data[i].slot.slot > time)
        ) {
          upcoming.push(data[i]);
        } else {
          past.push(data[i]);
        }
      }
      this.setState({ past, upcoming, unapproved });
    } catch (error) {
      console.log(error);
    }
  }

  rejectSlot(id) {
    const { unapproved } = this.state;
    for (let i = 0; i < unapproved.length; i++) {
      if (unapproved[i]._id === id) {
        delete unapproved[i];
        return;
      }
    }
  }

  approveSlot(id) {
    const { unapproved, upcoming } = this.state;
    for (let i = 0; i < unapproved.length; i++) {
      if (unapproved[i]._id === id) {
        this.setState({
          upcoming: upcoming.push(unapproved[i]),
        });
        delete unapproved[i];
        return;
      }
    }
  }

  render() {
    const d = new Date();
    // console.log(d.toISOString())
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString();
    console.log(this.state.appointments);
    return (
      <div>
        <div>
          {/* <h5>Unapporved</h5> */}
          {this.state.unapproved.map((appt) => (
            <UserCard
              user={this.props.user}
              rejectSlot={this.rejectSlot}
              approveSlot={this.approveSlot}
              appt={appt.user}
              slot={appt.slot}
            />
          ))}
        </div>
        <div>
          {/* <h5>Upcoming Appointments</h5> */}
          {this.state.upcoming.map((appt) => (
            <UserCard
              user={this.props.user}
              appt={appt.user}
              slot={appt.slot}
            />
          ))}
        </div>
        <div>
          {/* <h5>Past Appointments</h5> */}
          {this.state.past.map((appt) => (
            <UserCard
              appt={appt.user}
              user={this.props.user}
              slot={appt.slot}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ExpertApptPage);
