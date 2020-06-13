import React, { Component } from "react";
import API from "../API";

import getCurrentUser from "../utils/getCurrentUser";
import isEmpty from "../utils/isEmpty";

import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";



export default class Messaging extends Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      currChat: null,
      messages : [],
      user : {},
    };
  }

  async componentDidMount() {


    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        console.log(this.props);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        }
      }

     
    } catch (error) {
      console.log(error);
    }

    const { data } = await API.post("chats",{
      sender : this.props.user._id,
      receiver : "5e6d030b88a29b5268906fe6",
      message : ""
    });
    console.log(data);

    this.setState({messages : data.messageList});

   /*this.setState({messages : [
      {
        "text": "Hello there",
        "id": "1",
        "sender": {
          "name": "Sample",
          "uid": "user1",
        },
      },
      {
        "text": "Hello",
        "id": "2",
        "sender": {
          "name": "Sample2",
          "uid": "user2",
        },
      },
    ]});*/

    this.setState({user : {
      "uid" : this.props.user._id
    }
  });


  }

 async handlechat(e){
    console.log(e);
    const { data } = await API.post("chats",{
      sender : this.props.user._id,
      receiver : "5e6d030b88a29b5268906fe6",
      message : e
    });
    console.log(data);
    this.setState({messages : data.messageList});
    this.setState({
      chats: data,
      currChat: 0
    });
  }

  render() {
    return (
      <div>

     <ChatBox
      messages={this.state.messages}
      user={this.state.user}
      onSubmit={(e) => this.handlechat(e)}
    />

       {/*<div>
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
        <div></div>*/}

      </div>
    );
  }
}
