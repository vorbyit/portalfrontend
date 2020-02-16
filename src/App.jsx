import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AddSlots from './components/AddSlots';

import './App.css';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user : undefined,
    }
    this.updateUser = this.updateUser.bind(this);
  }

  async updateUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <Router>
          <Route 
            exact 
            path="/login" 
            render = {(props) => (
              <LoginForm
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/signup"
            render = {(props) => (
              <SignupForm 
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/addslots"
            render = {(props) => (
              <AddSlots
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
        </Router>
      </div>
    )
  }
}
