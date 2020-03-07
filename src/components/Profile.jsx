import React, { Component, Profiler } from 'react'
import { withRouter } from 'react-router-dom';
import API from '../API';

import defaultPic from '../public/defaultpic.png';
import isEmpty from '../utils/isEmpty';
import getCurrentUser from '../utils/getCurrentUser';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      type : '',
      pic : '',
      name : '',
      username : '',
      email : '',
      mobile : '',
    }
  }
  
  async componentDidMount(){
    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log('Not Logged In!');
          this.props.history.push('/login');
        }
      }
      const { data } = await API.get(`/${this.props.user.type.toLowerCase()}/profile`);
      this.setState( data );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        <div>{this.state.mobile}</div>
				<img src={this.state.pic === 'defaultpic' ? defaultPic : this.state.pic} alt="profpic"/>

        {this.props.user.type !== "EXPERT" ? null :
          <div>
            <div>{this.state.institute}</div>
            <div>{this.state.branch}</div>
            <div>{this.state.desc}</div>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Profile);
