import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";
import io from "socket.io-client";

class Chats extends Component {
  async componentDidMount() {
    try {
      if (this.props.user === undefined || isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        }
      } else {
        
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}

export default withRouter(Chats);
