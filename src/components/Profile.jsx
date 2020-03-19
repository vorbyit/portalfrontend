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
      const { data } = await API.get(`/expert/profile`);
      this.setState( data );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.state).map(key => 
            key === 'pic' ? 
            <img 
              src={this.state.pic === 'defaultpic' ? defaultPic : this.state.pic} 
              alt="profpic"
            />
            : key === '_id' ? null :
             <div>{key} : {this.state[key]}</div>
          )
        }
      </div>
    )
  }
}

export default withRouter(Profile);
