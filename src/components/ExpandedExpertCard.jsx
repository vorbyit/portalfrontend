import React, { Component } from "react";
import API from "../API";
import { withRouter } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import "../css/expertCard.css";
import defaultPic from "../public/defaultpic.png";

class ExpandedExpertCard extends Component {
  constructor(props) {
    super(props);
    const { expert } = props;

    this.state = {
      currDate: expert
        ? isEmpty(expert.slots)
          ? null
          : Object.keys(expert.slots)[0]
        : null,
      durationIndex: 1,
      choosenSlot: null,
    };

    this.setDate = this.setDate.bind(this);
    this.chooseSlot = this.chooseSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDuration = this.toggleDuration.bind(this);
  }

  setDate(evt) {
    const date = evt.target.id;
    this.setState({
      currDate: date,
    });
  }

  chooseSlot(evt) {
    const slot = evt.target.id;
    if (this.props.expert.slots[this.state.currDate][slot] !== null) {
      console.log("BOOKED");
    } else {
      this.setState({ choosenSlot: slot, });
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.choosenSlot === null) {
      alert("Select SLOT");
      return;
    }
    this.props.history.push({
      pathname: "/payment",
      data: this.props.expert._id,
      date: this.state.currDate,
      slot: this.state.choosenSlot,
      amount: this.state.durationIndex*100
    });
    // const slot = await API.post("/slots/bookslot", {
    //   date: this.state.currDate,
    //   slot: this.state.bookSlot,
    //   expertId: this.props.expert._id,
    // });
  }

  toggleDuration(e, btnNo) {
    e.preventDefault();
    if (btnNo === this.state.durationIndex) {
      return;
    }
    this.setState({ durationIndex: btnNo, });
  }

  render() {
    const show = this.props.showCard;
    const expert = this.props.expert;
    return !show ? null : (
      <React.Fragment>
        <div className="Expert-Card EC-details">
          <div className="info">
            <img
              src={expert.pic === "defaultpic" ? defaultPic : expert.pic}
              alt="profpic"
            />
            <div>
              <h3>{expert.name}</h3>
              <h3>{expert.institution}</h3>
              <h3>{expert.branch}</h3>
              <div className="btn-container">
                <button className="book-slot-btn" onClick={(e) => this.handleSubmit(e)}>
                  PROCEED TO PAY
                </button>
              </div>
            </div>
          </div>
          <div className="details">
            <button className="close-btn" onClick={(e) => this.props.minimizeCard(e)}>X</button>
            <div className="description">
              <h1>Description</h1>
              <p>{expert.desc}</p>
            </div>
            <div class="duration">
              <h2>Select Call Duration</h2>
              <div class="duration-btn-container">
                <button className={this.state.durationIndex === 1 ? "duration-btn btn-selected" : "duration-btn"} onClick={(e) => this.toggleDuration(e, 1)}>
                  <span>30 Min</span>
                  <span>|</span>
                  <span>100 Rs</span>
                </button>
                <button className={this.state.durationIndex === 2 ? "duration-btn btn-selected" : "duration-btn"} onClick={(e) => this.toggleDuration(e, 2)}>
                  <span>60 Min</span>
                  <span>|</span>
                  <span>200 Rs</span>
                </button>
              </div>
            </div>
            {isEmpty(expert.slots) ? null : (
              <div className="slots">
                <h2>Slots Available</h2>
                <div className="slots-input">
                  {!expert.slots[this.state.currDate]
                    ? null
                    : Object.keys(expert.slots[this.state.currDate]).map(
                      (slot) => (
                        <label id={slot} className={this.state.choosenSlot === slot ? "slot-selected" : null} onClick={(e) => this.chooseSlot(e)}>
                          {slot}
                        </label>
                      )
                    )
                  }
                </div>
                <div className="date-input">
                  {Object.keys(expert.slots).map((date) => (
                    <label id={date} onClick={this.setDate}>
                      {date}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div>Slots</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(ExpandedExpertCard);
