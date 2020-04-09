import React, { Component, Profiler } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SignupExpert from './components/SignupExpert';
import AddSlots from './components/AddSlots';
import ExpertPage from './components/ExpertsPage';
import ExpertApptPage from './components/ExpertApptPage';
import UserApptPage from './components/UserApptPage';
import Udaan from './components/Udaan';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Menubar from './components/Menubar';
import Menubar2 from './components/Menubar2';

import './App.css';
import ExpertApptCard from './components/ExpertApptCard';


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
            path="/" 
            render = {(props) => (
              <LoginForm
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/udaan"
            render = {(props) => (
              <Udaan />
            )}
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
              <Menubar
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
              <Menubar2
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
              <Menubar
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/appointments"
            render = {(props) => (
              // this.state.user==="EXPERT" ?
              <ExpertApptPage 
                user={this.state.user}
                updateUser={this.updateUser}
              // />:
              // <UserApptPage 
              //   user={this.state.user}
              //   updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/appointments"
            render = {(props) => (
              <ExpertApptCard
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/profile"
            render = {(props) => (
              <Menubar
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route 
            exact
            path="/profile"
            render = {(props) => (
              <Profile 
                user={this.state.user}
                updateUser={this.updateUser}
              />
            )}
          />
        </Router>
        <Footer />
      </div>
    )
  }
}
