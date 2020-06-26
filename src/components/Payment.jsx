import React, { Component } from "react";
import { useEffect } from 'react';
import API from "../API";
import { withRouter, Link } from 'react-router-dom';
import getCurrentUser from "../utils/getCurrentUser";
import isEmpty from "../utils/isEmpty";
import Razorpay from 'razorpay';
import {Helmet} from "react-helmet";

class Payment extends Component {
  constructor() {
    super();
    
    this.state = {
        payment_amount: 0,
      };
      this.paymentHandler = this.paymentHandler.bind(this);
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
  paymentHandler(e) {
    e.preventDefault();
    const expertID = this.props.location.data;
    const userID = this.props.user._id;
    const  payment_amount  = this.state.payment_amount;
    const self = this;
    const options = {
      key: "rzp_test_4JLpoFGA17xkZq",
      amount: payment_amount*100,
      name: 'Payments',
      description: 'Donate yourself some time',

      async handler(response) {
        const paymentId = response.razorpay_payment_id;
        const payment_data =await API.post('/payment/status',{
          payment_id:paymentId
        })
        console.log(payment_data)

        if(payment_data.data.status=="captured")
        {
          console.log(expertID);
          console.log(userID);
          const response =await API.post('/payment/success',{
            userID : userID,
            expertID : expertID
          })
          console.log(response);
        }
        const url ="http://localhost:3000/payment/"+paymentId+'/'+payment_amount;
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

    render(){
        const { payment_amount, refund_id } = this.state;
        return(
            
  <div className="wrapper">
        <div className="payments">
        <Helmet>
              <script src="https://checkout.razorpay.com/v1/checkout.js" type="text/javascript" />
            </Helmet>
          <div className="payments-title">
            <h1>Test Payments</h1>
          </div>
          <div className="payments-form">
            <form action="#" onSubmit={this.paymentHandler}>
              <p>
                <label htmlFor="pay_amount" className="pay_amount">
                  Amount to be paid
                </label>
              </p>
              <input
                type="number"
                value={payment_amount}
                className="pay_amount"
                placeholder="Amount in INR"
                onChange={e =>
                  this.setState({ payment_amount: e.target.value })
                }
              />
              <p>
                <button type="submit">Pay Now</button>
              </p>
            </form>
          </div>
        </div>
      </div>
  
        );
    }
    }
    export default withRouter(Payment);

