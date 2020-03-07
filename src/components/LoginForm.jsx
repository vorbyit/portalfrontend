import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import API from '../API';
import '../css/login.css';

import isEmpty from '../utils/isEmpty';
import getCurrentUser from '../utils/getCurrentUser';
import boyImg from '../public/boy2.svg';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.props.updateUser(currentUser);
      if (!isEmpty(currentUser)) this.props.history.push('/experts');
    } else this.props.history.push('/experts');
  }

  async onSubmit(e) {
    e.preventDefault();
    console.log(1);
    const loginUser = this.state;
    try {
      const { data } = await API.post('/auth/login', loginUser);
      this.props.updateUser(data);
      this.props.history.push('/experts');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="login">
        <div className="image">
          <img src={boyImg} alt="boy-studying" />
        </div>
        <div className="form">
          <div className="heading">Login</div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <hr />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <hr />
            <button type="submit">LOG IN</button>
          </form>
          <br />
          <div className="lead">or</div>
          <div className="lead">
            <Link className="signup-link" to="/SignUp">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
