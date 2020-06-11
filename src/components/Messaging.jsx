import React, { Component } from "react";
import API from "../API";

import getCurrentUser from "../utils/getCurrentUser";
import isEmpty from "../utils/isEmpty";

export default class Messaging extends Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      currChat: null
    };
  }

  async componentDidMount() {
    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        }
      }

      const { data } = await API.get("chat");
      console.log(data);
      this.setState({
        chats: data,
        currChat: 0
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
       <div>
          {this.state.chats.map((chat, i) => (
            <div id={i}>
              {this.props.user.type === "Expert" ? (
                <span>{chat.userName}</span>
              ) : (
                <span>{chat.expertName}</span>
              )}
              <span>{chat.slotTimings}</span>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    );
  }
}
