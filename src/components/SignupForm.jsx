import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import API from '../API';
import '../css/register.css';

import getCurrentUser from '../utils/getCurrentUser';
import isEmpty from '../utils/isEmpty';
import LoginForm from './LoginForm';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      cnfpassword: '',
      mobile: '',
      sex: 'male'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  async componentDidMount() {
    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.props.updateUser(currentUser);
      if (!isEmpty(currentUser)) this.props.history.push('/experts');
    } else this.props.history.push('/experts');
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newUser = this.state;
      const { data } = await API.post('auth/register', newUser);
      this.props.updateUser(data);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div id="signup-container">
        <div className="form-wrap">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnfpassword">Conform Password</label>
              <input
                type="password"
                name="cnfpassword"
                id="cnfpassword"
                value={this.state.cnfpassword}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label for="sex">Gender</label>
              <select name="sex" id="sex" value={this.state.sex} onChange={this.handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Contact Number</label>
              <input type="text" name="mobile" id="mobile" value={this.state.mobile} onChange={this.handleChange} />
            </div>
            <button className="btn" type="submit">
              Sign Up
            </button>
            <p className="bottom-text">
              By clicking the Sign Up button, you agree to our <br />
              <a href="#">Terms & Conditions</a> and
              <a href="#"> Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);