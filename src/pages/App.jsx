import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'bulma/css/bulma.css'
import { withRouter, Link } from 'react-router-dom';
import './App.css'
import Index from './index'
import Meeting from './meeting'

let slotid
class App extends Component {

  constructor(props) {
    super(props);
    console.log(this.props)
  }

  componentDidMount(){
    console.log(this.props)
    slotid = this.props.location.data
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <div className="full">
          <Route exact path="/" render={(props) => (
                  <Index
                    slotid={slotid}
                  />
                )}/>
          <Route path="/meeting" render={(props) => (
                  <Meeting
                    slotid={slotid}
                  />
                )}/>
        </div>
      </Router>
    )
  }
}

export default withRouter(App)
