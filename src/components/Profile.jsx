import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../API";
import "../css/Profile.css";
import defaultPic from "../public/defaultpic.png";
import editIcon from "../public/notepad-edit-icon.png";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";
import Chart from "react-google-charts";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      pic: "",
      name: "",
      username: "",
      email: "",
      mobile: "",
      call_count: 0,
      amount: 0,
    };
  }

  async componentDidMount() {
    console.log(1);
    try {
      if (this.props.user === undefined || isEmpty(this.props.user)) {
        console.log(1, this.props.user);
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        }
      }
      const { data } = await API.get(`/expert/profile`);
      this.setState(data.expert);
      this.setState({
        call_count: data.expert_data.call_count,
        amount: data.expert_data.amount,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async handleChange(e) {
    console.log(e.target.value);
    var param = e.target.name;
    var var1 = e.target.value;

    try {
      const { data } = await API.post("expert/edit", {
        property: param,
        value: var1,
      });
      console.log(data);
      this.setState({
        name: data.name,
        username: data.username,
        email: data.email,
        mobile: data.mobile,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="profile-container">
        <div className="profile-details">
          <span className="profile-pic">
            <img src={editIcon} alt="edit-icon" />
            <img
              className="img"
              src={
                this.state.pic === "defaultpic" ? defaultPic : this.state.pic
              }
              alt="profpic"
            />
          </span>
          <div className="profile-information">
            <span className="profile-detail">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </span>
            <span className="profile-detail">
              <label htmlFor="mobile-number">Mobile:</label>
              <input
                type="tel"
                name="mobile"
                id="mobile-number"
                value={this.state.mobile}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </span>
            <span className="profile-detail">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                value={this.state.email}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </span>
            {this.state.type !== "EXPERT" ? null : (
              <>
                <span className="profile-detail">
                  <label htmlFor="college">College:</label>
                  <input
                    type="text"
                    name="institution"
                    id="college"
                    value={this.state.institution}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </span>
                <span className="profile-detail">
                  <label htmlFor="expertise">Expertise:</label>
                  <input
                    type="text"
                    name="branch"
                    id="expertise"
                    value={this.state.branch}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </span>
              </>
            )}
          </div>
        </div>

        <div className="about">
          <h2>Bio:</h2>
          <div className="txt1">{this.state.desc}</div>
        </div>

        {this.state.type !== "EXPERT" ? null : (
          <div className="stats-container">
            <div className="details2">
              <div>
                <div className="div1">No. of students guided</div>

                <div className="div1">{this.state.call_count}</div>
              </div>
              <div>
                <div className="div2">Amount Earned</div>
                <div className="div2">{this.state.amount}</div>
              </div>
            </div>
            <div className="chart">
              <div className="chart1">
                <Chart
                  width={"500px"}
                  height={"300px"}
                  chartType="Bar"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Week", "Amount"],
                    ["Week 1", 1000],
                    ["Week 2", 600],
                    ["Week 3", 660],
                    ["Week 4", 250],
                  ]}
                  options={{
                    hAxis: { title: "Week", minValue: 1, maxValue: 7 },
                    vAxis: { title: "Amount", minValue: 0, maxValue: 1000 },
                    legend: "none",
                  }}
                  // For tests
                  rootProps={{ "data-testid": "2" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Profile);
