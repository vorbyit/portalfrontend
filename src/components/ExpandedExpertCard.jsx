import React, { Component } from "react";
import API from "../API";
import { withRouter } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import "../css/expertCard.css";
import defaultPic from "../public/defaultpic.png";
import getCurrentUser from "../utils/getCurrentUser";
import Razorpay from 'razorpay';
import { Helmet } from "react-helmet";

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
    this.paymentHandler = this.paymentHandler.bind(this);
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

  async componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        console.log(this.props);
      }


    } catch (error) {
      console.log(error);
    }

  }
  
  paymentHandler() {
    const expertID = this.props.expert._id;
    const userID = this.props.user._id;
    const payment_amount = parseInt(this.state.durationIndex, 10)*100;
    const self = this;
    const options = {
      key: "rzp_test_4JLpoFGA17xkZq",
      amount: payment_amount*100,
      name: 'Payments',
      description: 'Donate yourself some time',

      async handler(response) {
        const paymentId = response.razorpay_payment_id;
        const payment_data = await API.post('/payment/status', {
          payment_id: paymentId
        })
        console.log(payment_data)

        if (payment_data.data.status == "captured") {
          console.log(expertID);
          console.log(userID);
          const response = await API.post('/payment/success', {
            userID: userID,
            expertID: expertID,
            amount : payment_data.data.amount
          })
          console.log(response);
        }
        const url = "http://localhost:3000/payment/" + paymentId + '/' + payment_amount;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: 'get',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
          // .then(resp=>resp.json())
          .then(function (data) {
            console.log('Request succeeded with JSON response', data);

            self.setState({
              refund_id: response.razorpay_payment_id
            });
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      },

      prefill: {
        name: 'Shashank Shekhar',
        email: 'ss@localtrip.in',
      },
      notes: {
        address: 'Goa,India',
      },
      theme: {
        color: '#9D50BB',
      },
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  }


  async handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.choosenSlot === null) {
      alert("Select SLOT");
      return;
    }
    this.paymentHandler();
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
        <div className="EC-details">
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