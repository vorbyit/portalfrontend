import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import SignupExpert from "./components/SignupExpert";
import AddSlots from "./components/AddSlots";
import ExpertPage from "./components/ExpertsPage";
import ExpertApptPage from "./components/ExpertApptPage";
import UserApptPage from "./components/UserApptPage";
import Udaan from "./components/Udaan";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Menubar from "./components/Menubar";

import Messaging from "./components/Messaging";

import Payment from "./components/Payment";

import PaymentStatus from "./components/PaymentStatus";

import Index from "./pages/index/index";

import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };
    this.updateUser = this.updateUser.bind(this);
    this.scrolldown = this.scrolldown.bind(this);
  }

  async updateUser(user) {
    this.setState({ user });
  }

  async scrolldown() {
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    window.scrollTo(0, height);
  }

  render() {
    return (
      <div className="main-container">
        <Router>
          <Navbar user={this.state.user} updateUser={this.updateUser} />
          <div className="main-content-wrapper">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <LoginForm
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                exact
                path="/udaan"
                render={(props) => <Udaan scrolldown={this.scrolldown} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => (
                  <LoginForm
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                exact
                path="/signup"
                render={(props) => (
                  <SignupForm
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
              <Route
                exact
                path="/signup/expert"
                render={(props) => (
                  <SignupExpert
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />

              <Route
                exact
                path="/experts"
                render={(props) => (
                  <ExpertPage
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                )}
              />
            </Switch>

            <Route path="/expert" component={Menubar} />

            <Route
              exact
              path="/expert/addslots"
              render={(props) => (
                <AddSlots user={this.state.user} updateUser={this.updateUser} />
              )}
            />

            <Route
              exact
              path="/expert/appointments"
              render={(props) =>
                this.state.user === undefined ||
                this.state.user.type === "EXPERT" ? (
                  <ExpertApptPage
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                ) : null
              }
            />

            <Route
              exact
              path={["/expert/profile", "/user/profile"]}
              render={(props) => (
                <Profile user={this.state.user} updateUser={this.updateUser} />
              )}
            />

            <Route
              exact
              path="/meeting"
              render={(props) => (
                <Index user={this.state.user} updateUser={this.updateUser} />
              )}
            />

            <Route
              exact
              path="/advisors"
              render={(props) =>
                this.state.user === undefined ||
                this.state.user.type === "USER" ? (
                  <UserApptPage
                    user={this.state.user}
                    updateUser={this.updateUser}
                  />
                ) : null
              }
            />

            <Route
              exact
              path="/chats"
              render={(props) => (
                <Messaging
                  user={this.state.user}
                  updateUser={this.updateUser}
                />
              )}
            />

            <Route
              exact
              path="/payment"
              render={(props) => (
                <Payment user={this.state.user} updateUser={this.updateUser} />
              )}
            />

            <Route
              exact
              path="/payment/status"
              render={(props) => (
                <PaymentStatus
                  user={this.state.user}
                  updateUser={this.updateUser}
                />
              )}
            />

            {/* <ChatBox /> */}
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
