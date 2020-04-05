import React, { Component, Profiler } from 'react'
import { withRouter } from 'react-router-dom';
import API from '../API';
import '../css/Profile.css'
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
        <div className='profile'>
          <div className='pic'>
        <img src={this.state.pic === 'defaultpic' ? defaultPic : this.state.pic} alt="profpic"/>
        </div>
        <div className='details1'>
        Name: <span className='box'>{this.state.name}</span><br/>
        College:<span className='box'>{this.state.username}</span><br/>
        Branch:<span className='box'>{this.state.email}</span><br/>
        Expertise:<span className='box'>{this.state.mobile}</span><br/>
				

        {this.props.user.type !== "EXPERT" ? null :
          <div>
            <div>{this.state.institute}</div>
            <div>{this.state.branch}</div>
            <div className='about'><h2>Bio:</h2>{this.state.desc}</div>
          </div>
        }
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(Profile);
