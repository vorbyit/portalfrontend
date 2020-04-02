import React, { Component } from "react";
import API from "../API";
import isEmpty from "../utils/isEmpty";
import "../css/expertCard.css";

import defaultPic from "../public/defaultpic.png";

export default class ExpertCard extends Component {
  constructor(props) {
    super(props);
    const { expert } = props;
    this.state = {
      currDate: isEmpty(expert.slots) ? null : Object.keys(expert.slots)[0],
      bookSlot: undefined,
      showDetails: false
    };
    this.setDate = this.setDate.bind(this);
    this.bookSlot = this.bookSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.minimizeCard = this.minimizeCard.bind(this);
  }

  setDate(evt) {
    const date = evt.target.id;
    this.setState({
      currDate: date
    });
  }

  bookSlot(evt) {
    const slot = evt.target.id;
    if (this.props.expert.slots[this.state.currDate][slot] !== null) {
      console.log("BOOKED");
    } else {
      this.setState({
        bookSlot: slot
      });
    }
  }

  minimizeCard() {
    this.setState({
      showDetails: false
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state);
    if (this.state.showDetails === false) {
      this.setState({
        showDetails: true
      });
    } else if (this.state.bookSlot === undefined) {
      console.log("Select SLOT");
    } else {
      const slot = await API.post("/slots/bookslot", {
        date: this.state.currDate,
        slot: this.state.bookSlot,
        expertId: this.props.expert._id
      });
      console.log(slot);
    }
  }

  render() {
    const { expert } = this.props;

    return (
      <div
        className={
          !this.state.showDetails ? "Expert-Card" : "Expert-Card EC-details"
        }
      >
        <div className="info">
          <img
            src={expert.pic === "defaultpic" ? defaultPic : expert.pic}
            alt="profpic"
          />

          <div>
            <h3>{expert.name}</h3>
            <h3>{expert.institution}</h3>
            <h3>{expert.branch}</h3>
            <button onClick={this.handleSubmit}>BOOK SLOT</button>
          </div>
        </div>
        {!this.state.showDetails ? null : (
          <div className="details">
            <button onClick={this.minimizeCard}>X</button>
            <div className="description">
              <h1>Description</h1>
              <p>{expert.desc}</p>
            </div>
            <div className="form">
              <div class="duration">
                <h2>Select Call Duration</h2>
                <div class="duration-input">
                  <input
                    type="radio"
                    name="duration"
                    id="30min"
                    value="30"
                    checked
                  />
                  <label for="30min">
                    {" "}
                    <span>30 min&nbsp;</span> <span>100 Rs</span>
                  </label>

                  <input type="radio" name="duration" id="60min" value="60" />
                  <label for="60min">
                    {" "}
                    <span>60 min&nbsp;</span> <span>200 Rs</span>
                  </label>
                </div>
              </div>
              <div></div>
            </div>
            {isEmpty(expert.slots) ? null : (
              <div className="slots">
                <h2>Slots Available</h2>
                <div className="slots=input">
                  {Object.keys(expert.slots[this.state.currDate]).map(slot => (
                    <label id={slot} onClick={this.bookSlot}>
                      {slot}
                    </label>
                  ))}
                </div>
                <div className="date-input">
                  {Object.keys(expert.slots).map(date => (
                    <label id={date} onClick={this.setDate}>
                      {date}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div>Slots</div>
          </div>
        )}
      </div>
    );
  }
}
