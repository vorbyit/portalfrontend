import React, { Component } from "react";
import API from "../API";
import { withRouter, Link } from 'react-router-dom';
import getCurrentUser from "../utils/getCurrentUser";
import isEmpty from "../utils/isEmpty";

class PaymentStatus extends Component {
  constructor() {
    super();
    this.state = {
      order : ""
    };
  }

  async componentDidMount() {
     
  }

    render(){
        return(
        <div>
          
        </div>
        );
    }
    }
    export default withRouter(PaymentStatus);

