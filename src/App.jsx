import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SignupExpert from './components/SignupExpert';
import AddSlots from './components/AddSlots';
import ExpertPage from './components/ExpertsPage';
import AppointmentPage from './components/AppointmentPage';
import Navbar from './components/Navbar';


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
          <Navbar 
            user={this.state.user}
            updateUser={this.updateUser}
          />
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
            path="/signup/expert"
            render = {(props) => (
            <SignupExpert 
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
          <Route 
            exact
            path="/experts"
            render = {(props) => (
              <ExpertPage 
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/appointments"
            render = {(props) => (
              <AppointmentPage 
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
