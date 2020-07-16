/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import API from "../API";
import defaultPic from "../public/defaultpic.png";
import { withRouter, Link } from "react-router-dom";
import "../css/UserCard.css";

class UserCard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.onApprove = this.onApprove.bind(this);
    this.onReject = this.onReject.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  async onApprove(e) {
    try {
      const approved = await API.post("slots/approve", {
        id: e.target.id,
      });
      console.log(approved);
      if (approved.status === 200) {
        this.props.approveSlot(approved.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onReject(e) {
    try {
      console.log(e.currentTarget.id);
      /*const rejected = await API.post("slots/reject", {
        id: e.target.id,
      });
      if (rejected.status === 200) {
        this.props.rejectSlot(rejected.data._id);
      }*/
      this.props.rejectSlot(e.currentTarget.id);
    } catch (error) {
      console.log(error);
    }
  }

  handleMessage(e) {
    this.props.history.push({
      pathname: "/chats",
      data: e.currentTarget.id,
    });
  }

  render() {
    console.log(this.props.slot[0])
    console.log(this.props.slot[0]._id)
    return (
      <div className="user-card-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408 241.812">
          <path
            id="Path_340"
            data-name="Path 340"
            d="M201.4,261.8C111.509,101.219,8.519,249.076.5,261.042V117.8A23.5,23.5,0,0,1,24,94.3H385a23.5,23.5,0,0,1,23.5,23.5V263.073c-7.059,9.817-54.726,73.042-111.573,73.037C266.114,336.108,232.6,317.529,201.4,261.8Z"
            transform="translate(0 -94.298)"
            fill="#99ddda"
          />
        </svg>
        <img
          src={
            this.props.appt[1] === "defaultpic"
              ? defaultPic
              : this.props.user.pic
          }
          alt="profpic"
        />
        <div className="content">
          <div className="user-name">
            {this.props.appt.name}
          </div>
          <div className="slot-info">
            <div>{this.props.slot[0].Date.split("T")[0]}</div>
            <div>{this.props.slot[0].slot}</div>
          </div>
          {!this.props.slot[0].approved ? (
            <div className="btn-panel">
              <button
                id={this.props.slot[0]._id}
                className="btn btn-approve"
                onClick={this.onApprove}
              >
                Approve
              </button>
              <button
                id={this.props.slot[0]._id}
                className="btn btn-reject"
                onClick={(e) => this.onReject(e)}
              >
                Reschedule
              </button>
            </div>
          ) : (
            <div className="btn-panel">
              <button id={this.props.slot[0].userId} className="btn btn-success" onClick={(e) => this.handleMessage(e)}>Message</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(UserCard)
