import React, { Component } from "react";
import API from "../API";

import getCurrentUser from "../utils/getCurrentUser";
import isEmpty from "../utils/isEmpty";
import ScriptTag from 'react-script-tag';
import Mustache from 'mustache';
import io from 'socket.io';


export default class Messaging extends Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      currChat: null
    };
  }

  async componentDidMount() {


    /*const socket = io()

    // Elements
    const $messageForm = document.querySelector('#message-form')
    const $messageFormInput = $messageForm.querySelector('input')
    const $messageFormButton = $messageForm.querySelector('button')
    const $messages = document.querySelector('#messages')
    
    // Templates
    const messageTemplate = document.querySelector('#message-template').innerHTML
    
    socket.on('message', (message) => {
        console.log(message)
        const html = Mustache.render(messageTemplate, {
            message
        })
        $messages.insertAdjacentHTML('beforeend', html)
    })
    
    $messageForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        $messageFormButton.setAttribute('disabled', 'disabled')
    
        const message = e.target.elements.message.value
    
        socket.emit('sendMessage', message, (error) => {
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = ''
            $messageFormInput.focus()
    
            if (error) {
                return console.log(error)
            }
    
            console.log('Message delivered!')
        })
    })*/


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
        <ScriptTag  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js" />
        <ScriptTag  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js" />
        <ScriptTag  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js" />
        <ScriptTag  type="text/html" src="/socket.io/socket.io.js" />

        HELLO
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
