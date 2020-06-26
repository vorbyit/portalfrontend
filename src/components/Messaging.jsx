import React, { Component } from "react";
import API from "../API";
import { withRouter, Link } from 'react-router-dom';
import getCurrentUser from "../utils/getCurrentUser";
import isEmpty from "../utils/isEmpty";

import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "../css/Messaging.css"

import VideoCallImg from "../public/icons8-video-call-40.png";

class Messaging extends Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      currChat: null,
      messages : [],
      user : {},
    };
    this.handleVideoCall = this.handleVideoCall.bind(this);
  }

  handleVideoCall() {
    this.props.history.push('/meeting');
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
      receiver : this.props.location.data,
      message : ""
    });
    console.log(data);
    console.log(this.props);

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
      receiver : this.props.location.data,
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

    <div className="videodiv">
      <button className="video-btn" onClick={this.handleVideoCall}><img src={VideoCallImg} /></button>
      </div>
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
export default withRouter(Messaging);
