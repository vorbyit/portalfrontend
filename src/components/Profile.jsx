import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../API";
import "../css/Profile.css";
import defaultPic from "../public/defaultpic.png";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";
import Chart from "react-google-charts";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      pic: "",
      name: "",
      username: "",
      email: "",
      mobile: "",
      call_count:0,
      amount:0
    };
  }

  async componentDidMount() {
    console.log(1);
    try {
      if (this.props.user === undefined || isEmpty(this.props.user)) {
        console.log(1, this.props.user)
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        }
      }
      const { data } = await API.get(`/expert/profile`);
      this.setState( data.expert );
      this.setState({call_count:data.expert_data.call_count,amount:data.expert_data.amount})
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
      <div>
        <div className="profile">
          <div className="pic">
            <img
              className="img"
              src={
                this.state.pic === "defaultpic" ? defaultPic : this.state.pic
              }
              alt="profpic"
            />
          </div>
          <div className="details1">
            <div>
              Name: <span className="box">{this.state.name}</span>
            </div>
            <br />
            <div>
              College:<span className="box">{this.state.username}</span>
            </div>
            <br />
            <div>
              Email:<span className="box">{this.state.email}</span>
            </div>
            <br />
            <div>
              Expertise:<span className="box">{this.state.mobile}</span>
            </div>
            <br />
            
            {this.state.type !== "EXPERT" ? null : (
              <div>
                <div>{this.state.institute}</div>
                <div>
                  {" "}
                  Branch:<span className="box">{this.state.branch}</span>
                </div>
                <div className="about">
                  <h2>Bio:</h2>
                  <div className="txt1">{this.state.desc}</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      <div className="details2">
        <div>
        <div className="div1">
         No. of students guided
       </div>

       <div className = "div2">
       {this.state.call_count}
       </div>
       </div>

       <div>
       <div className="div1">
         Amount Earned
       </div>
       <div className = "div2">
       {this.state.amount}
       </div>
       </div>
       
      </div>


       <div className="chart">
        
       <Chart
  width={'500px'}
  height={'300px'}
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ['Week', 'Amount'],
    ['Week 1', 1000],
    ['Week 2', 600],
    ['Week 3', 660],
    ['Week 4', 250],
  ]}
  options={{
      hAxis: { title: 'Week', minValue: 1, maxValue: 7 },
      vAxis: { title: 'Amount', minValue: 0, maxValue: 1000 },
      legend: 'none',
    
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>

       </div>

      </div>
    );
  }
}

export default withRouter(Profile);
