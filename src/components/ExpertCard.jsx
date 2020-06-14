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
      showDetails: false,
      faved: false,
    };
    this.setDate = this.setDate.bind(this);
    this.bookSlot = this.bookSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.minimizeCard = this.minimizeCard.bind(this);
    this.handleFav = this.handleFav.bind(this);
  }

  setDate(evt) {
    const date = evt.target.id;
    this.setState({
      currDate: date,
    });
  }

  bookSlot(evt) {
    const slot = evt.target.id;
    if (this.props.expert.slots[this.state.currDate][slot] !== null) {
      console.log("BOOKED");
    } else {
      this.setState({
        bookSlot: slot,
      });
    }
  }

  minimizeCard() {
    this.setState({
      showDetails: false,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state);
    if (this.state.showDetails === false) {
      this.setState({
        showDetails: true,
      });
    } else if (this.state.bookSlot === undefined) {
      console.log("Select SLOT");
    } else {
      const slot = await API.post("/slots/bookslot", {
        date: this.state.currDate,
        slot: this.state.bookSlot,
        expertId: this.props.expert._id,
      });
      console.log(slot);
    }
  }

  async handleFav(evt) {
    evt.preventDefault();
    this.setState({ faved: !this.state.faved });
    const expert = await API.post("/expert/wishlist", {
      expertId: this.props.expert._id,
    });
    console.log(expert);
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
            className="Expert-avatar"
            src={expert.pic === "defaultpic" ? defaultPic : expert.pic}
            alt="profpic"
          />

          <div className="Expert-info">
            <h3>{expert.name}</h3>
            <h3>{expert.institution}</h3>
            <h3>{expert.branch}</h3>
            <div className="btn-container">
              <button className="book-slot-btn" onClick={this.handleSubmit}>
                BOOK SLOT
              </button>
              <button className="fav-btn" onClick={this.handleFav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 65.54 65.81"
                >
                  <title>Fav Button</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        id="Path_340"
                        data-name="Path 340"
                        className={
                          !this.state.faved ? "cls-1-uncheck" : "cls-1-check"
                        }
                        d="M12.75,6.57c14.33-10.9,34.91-7.93,46,6.62s8.41,35.17-5.91,46.06-34.91,7.92-46-6.62S-1.58,17.46,12.75,6.57Z"
                      />
                      <path
                        id="Icon_awesome-heart"
                        data-name="Icon awesome-heart"
                        className="cls-2"
                        d="M45,21.81a8,8,0,0,0-11,.62L32.85,23.6l-1.14-1.21a8,8,0,0,0-10.94-1A8.43,8.43,0,0,0,19.7,33.28c.09.11.18.22.28.32L31.14,45.53a1.85,1.85,0,0,0,2.6.1l.06-.06L45.36,34a8.42,8.42,0,0,0,0-11.92Z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {!this.state.showDetails ? null : (
          <div className="details">
            <button className="collapse-btn" onClick={this.minimizeCard}>
              X
            </button>
            <div className="description">
              <h2>Description</h2>
              {/* <p>{expert.desc}</p> */}
              <p>
                Burst all your myths about college! Introducing project Udaan, a
                platform where you can access one to one session with
                counselors, mentors and seniors to know it all. No page left
                unturned. Burst all your myths about college! Introducing
                project Udaan, a platform where you can access one to one
                session with counselors, mentors and seniors to know it all. No
                page left unturned.
              </p>
            </div>
            <div className="form">
              <div class="duration">
                <h2>Select Call Duration</h2>
                <div class="duration-input">
                  <div>
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
                  </div>
                  <div>
                    <input type="radio" name="duration" id="60min" value="60" />
                    <label for="60min">
                      {" "}
                      <span>60 min&nbsp;</span> <span>200 Rs</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isEmpty(expert.slots) ? null : (
              <div className="slots">
                <h2>Slots Available</h2>
                <div className="slots-input">
                  {Object.keys(expert.slots[this.state.currDate]).map(
                    (slot) => (
                      <label id={slot} onClick={this.bookSlot}>
                        {slot}
                      </label>
                    )
                  )}
                </div>
                <div className="date-input">
                  {Object.keys(expert.slots).map((date) => (
                    <label id={date} onClick={this.setDate}>
                      {date}
                    </label>
                  ))}
                </div>
                <div>Slots</div>
              </div>
            )}
            
          </div>
        )}
      </div>
    );
  }
}
