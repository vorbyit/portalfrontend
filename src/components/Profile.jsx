import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../API";
import "../css/Profile.css";
import defaultPic from "../public/defaultpic.png";
import editIcon from "../public/notepad-edit-icon.png";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";
import Chart from "react-google-charts";

let tempDetails = {
  name: "",
  mobile: "",
  email: "",
  institution: "",
  branch: "",
};

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
      showBtnPanel: false,
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
      console.log(this.props.user);
      const { data } = await API.post("/user/profile", {
        userID: this.props.user._id,
      });
      console.log(data);
      this.setState(data.expert);
      this.setState({
        call_count: data.expert_data.call_count,
        amount: data.expert_data.amount,
      });
      for (const detail in tempDetails) {
        tempDetails[detail] = data.expert[detail];
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async handleChange(e) {
    if (!this.state.showBtnPanel) {
      this.setState({ showBtnPanel: true });
    }
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value);
    // var param = e.target.name;
    // var var1 = e.target.value;
  }

  handleSave(e) {
    e.preventDefault();
    let changed = false;
    for (let detail in tempDetails) {
      if (tempDetails[detail] !== this.state[detail]) {
        changed = true;
        break;
      }
    }
    if (!changed) {
      this.setState({ showBtnPanel: false });
      return null;
    }
    // try {
    //   const { data } = await API.post("expert/edit", {
    //     property: param,
    //     value: var1,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    this.setState({ showBtnPanel: false });
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({
      name: tempDetails.name,
      mobile: tempDetails.mobile,
      email: tempDetails.email,
      institution: tempDetails.institution,
      branch: tempDetails.branch,
      showBtnPanel: false,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="profile-container">
        <div className="profile-details">
          <span className="profile-pic">
            <img src={editIcon} alt="edit-icon" />
            <img
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
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={this.state.mobile}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </span>
            <span className="profile-detail">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
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
                  <label htmlFor="institution">College:</label>
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    value={this.state.institution}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </span>
                <span className="profile-detail">
                  <label htmlFor="branch">Expertise:</label>
                  <input
                    type="text"
                    name="branch"
                    id="branch"
                    value={this.state.branch}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </span>
              </>
            )}
            {this.state.showBtnPanel ? (
              <span className="btn-panel">
                <button
                  className="btn save-btn"
                  onClick={(e) => this.handleSave(e)}
                >
                  Save
                </button>
                <button
                  className="btn cancel-btn"
                  onClick={(e) => this.handleCancel(e)}
                >
                  Cancel
                </button>
              </span>
            ) : null}
          </div>
        </div>

        <div className="about">
          <h2>Bio:</h2>
          <div className="expert-description">{this.state.desc}</div>
        </div>

        {this.state.type !== "EXPERT" ? null : (
          <div className="stats-container">
            <div className="stats">
              <div className="stat">
                <div className="param">No. of students guided</div>
                <div className="value">{this.state.call_count}</div>
              </div>
              <div className="stat">
                <div className="param">Amount Earned</div>
                <div className="value">{this.state.amount}</div>
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
