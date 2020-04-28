import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import API from '../API';
import logo from '../public/vorby-logo.png';
import '../css/navbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import getCurrentUser from '../utils/getCurrentUser';
import isEmpty from '../utils/isEmpty';

class Navbar extends Component {
  constructor() {
	super();
	this.state={
		authBar : false,
	}
	this.onLogout = this.onLogout.bind(this);
	this.toggleAuthBar=this.toggleAuthBar.bind(this)
  }

  async onLogout() {
    const { data } = await API.get('/auth/logout');
    if(data.success) {
      this.props.updateUser(undefined);
      this.props.history.push('/login');
      this.setState({ authBar : false })
    } else {
      console.log("ERROR LOGGING OUT");
    }
  }

  async componentDidMount() {
    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
      }
    } catch (error) {
      
    }
  }

  toggleAuthBar() {
	  this.setState({
		  authBar : !this.state.authBar,
	  })
  }

  render() {
    return (
      <div>
        {/* {this.props.user.username} */}
        <div id="navbar">
          <div className="logo">
            <img src={logo} alt="Vorby Logo" />
          </div>
          <div className="list-wrap">
            <NavLink className="nav-item" to="/" activeClassName="active">
              Vision
            </NavLink>
            <NavLink className="nav-item" to="/experts" activeClassName="active">
              Advisors
            </NavLink>
            <NavLink className="nav-item" to="/udaan" activeClassName="active">
              Project Udaan
            </NavLink>
            <NavLink className="nav-item" to="/" activeClassName="active">
              Contact Us
            </NavLink>
            {this.props.user === undefined ? 
              <NavLink className="nav-item" to="/login" activeClassName="active">
                Login
              </NavLink> :
              <button className="btn" onClick={this.toggleAuthBar}>
                <FontAwesomeIcon className="fa" style={{width: '1.75em'}} icon={ faUser }/>
                <div className="dropdown-content" >
                  <NavLink className="nav-item" to="/profile" activeClassName="active">
                    Your Profile
                  </NavLink>
                  <NavLink className="nav-item" to="/appointments" activeClassName="active">
                    {this.props.user !== undefined && this.props.user.type === "EXPERT" ? 
                      <span>Appointments</span> : 
                      <span> Your Advisors</span> 
                    }
                  </NavLink>
                  <NavLink className="nav-item" to="/chats" activeClassName="active">
                    Message
                  </NavLink>
                  {this.props.user === undefined || this.props.user.type!=="EXPERT" ? null : 
                    <NavLink className="nav-item" to="/addslots" activeClassName="active">
                      Add Slots
                    </NavLink>
                  }
                  <div className="nav-item" onClick={this.onLogout}>Logout</div>
                </div>
              </button>
            }
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Navbar);