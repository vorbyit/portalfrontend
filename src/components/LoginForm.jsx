/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../assets/login.css';
import API from '../API';
import isEmpty from '../utils/isEmpty';
import getCurrentUser from '../utils/getCurrentUser';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.props.updateUser(currentUser);
      if (!isEmpty(currentUser)) this.props.history.push('/dashboard');
    } else this.props.history.push('/dashboard');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();
    const loginUser = this.state;
    try {
      const { data } = await API.post('/auth/login', loginUser);
      this.props.updateUser(data);
      this.props.history.push('/dashboard');
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="container">
        <h1 className="login"> LOGIN </h1>
        <p className="para"> I am </p>

        <form onSubmit={this.onSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <br />
          <Link to="/forgot" className="forgotPassword"> Forgot Password ? </Link>
          <button type="submit" className="button">
                        Login
          </button>
        </form>

        <p> Do not have an Account ? </p>
        {/* <Link className="routeButton" to="/SignUp"> SignUp </Link> */}
      </div>
    );
  }
}

export default withRouter(LoginForm);
