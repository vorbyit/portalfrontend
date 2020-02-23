import React, { Component } from 'react';
import API from '../API';
import '../css/login.css';
import isEmpty from '../utils/isEmpty';
import getCurrentUser from '../utils/getCurrentUser';
<<<<<<< HEAD
import boyImg from '../public/boy2.svg'

=======
import back from '../public/login.png';

// import loginimg from '';
>>>>>>> 24bd44a3baf4d1fe344bfed92a86a90a6ce75942
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

  async onSubmit(e) {
    e.preventDefault();
    console.log(1);
    const loginUser = this.state;
    try {
      const { data } = await API.post('/auth/login', loginUser);
      this.props.updateUser(data);
      this.props.history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
<<<<<<< HEAD
      <div class="login">
        <div class="image">
          <img src={boyImg} alt="boy-studying" />            
=======
      <div className="login">
        <div className="image">
          <img src={back} alt="boy-studying" />
>>>>>>> 24bd44a3baf4d1fe344bfed92a86a90a6ce75942
        </div>
        <div className="form">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
