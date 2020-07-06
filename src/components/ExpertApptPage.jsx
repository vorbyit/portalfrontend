import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../API";
import UserCard from "./UserCard";
import ExpertApptCard from "./ExpertApptCard";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";
import "../css/Expertapptpage.css"
let slotvalue = "";
let slotid = null;
class ExpertApptPage extends Component {
  constructor() {
    super();
    this.state = {
      unapproved: [],
      upcoming: [],
      past: [],

      sortBy: "upcoming",
      appointments : [],
      slots : [],
      slot : "",
      displayslots : false,
      rescheduled : false
    };
    this.approveSlot = this.approveSlot.bind(this);
    this.handleSlots = this.handleSlots.bind(this);
    this.handleReschedule = this.handleReschedule.bind(this);
    this.rejectSlot = this.rejectSlot.bind(this);
  }

  async componentDidMount() {
    try {
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (isEmpty(currentUser)) {
          console.log("Not Logged In!");
          this.props.history.push("/login");
        } else if (currentUser.type !== "EXPERT") {
          console.log("Experts only allowed");
          this.props.history.push("/experts");
        }
      }
    console.log(this.props.user._id);
      const { data } = await API.post("/expert/appointments",{
        expertID:this.props.user._id
      });
      console.log(data);
      this.setState({appointments:data});
      const upcoming = [];
      const past = [];
      const unapproved = [];
      const d = new Date();
      const date = d.toISOString().split("T")[0];
      const time = d.toTimeString();
      let slot1,slot2;

      for (let i=0 ; i<24; i++)
      {
        if(i<10)
        {
          slot1 = "0"+i.toString()+":00-0"+i.toString()+":30"
          if(i==9)
          {
            slot2 = "0"+i.toString()+":30-10:00"
          }
          else
          {
            slot2 = "0"+i.toString()+":30-0"+(i+1).toString()+":00"
          }
        }
        else
        {
          slot1 = i.toString() + ":00-" + i.toString()+":30"
          if(i==19)
          {
            slot2 = i.toString() + ":30-20:00" 
          }
          else if(i==23)
          {
            slot2 = i.toString() + ":30-00:00"
          }
          else
          {
            slot2 = i.toString() + ":30-" + (i+1).toString() + ":00"
          }
        }
        this.state.slots.push(slot1)
        this.state.slots.push(slot2)
      }

      for (let i = 0; i < data.length; i++) {
        if (!data[i].slot[0].approved) {
          unapproved.push(data[i]);
        } else if (
          data[i].slot[0].Date.split("T")[0] > date ||
          (data[i].slot[0].Date.split("T")[0] === date && data[i].slot[0].slot > time)
        ) {
          upcoming.push(data[i]);
        } else {
          past.push(data[i]);
        }
      }
      this.setState({ past, upcoming, unapproved });
    } catch (error) {
      console.log(error);
    }
  }

  rejectSlot(id) {
    console.log(id);
    slotid = id;
    this.setState({displayslots:true});
    /*const { unapproved } = this.state;
    for (let i = 0; i < unapproved.length; i++) {
      if (unapproved[i]._id === id) {
        delete unapproved[i];
        return;
      }
    }*/
  }

 handleSlots(e)
 {
   e.preventDefault();
  console.log(e.currentTarget.value);
  slotvalue = e.currentTarget.value
 }

 async handleReschedule()
 {
   this.setState({rescheduled:true})
   console.log(slotvalue);
   const response = await API.post("/slots/reschedule", {
    id: slotid,
    slot : slotvalue
  });
  console.log(response);
  
  const { data } = await API.post("chats",{
    sender : response.data.expertId,
    receiver : response.data.userId,
    message : "Your slot has been rescheduled"
  });
  console.log(data);

 }

  approveSlot(id) {
    const { unapproved, upcoming } = this.state;
    for (let i = 0; i < unapproved.length; i++) {
      if (unapproved[i]._id === id) {
        this.setState({
          upcoming: upcoming.push(unapproved[i]),
        });
        delete unapproved[i];
        return;
      }
    }
  }

  render() {
    const d1 = new Date();
    const time1 = d1.toTimeString().slice(0,5);
    console.log(time1);
    console.log(this.state.slots)
    const d = new Date();
    // console.log(d.toISOString())
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString();
    console.log(this.state.appointments);
    return (
      <div>
        <div>
          <h5>Unapproved</h5>
          {!this.state.rescheduled ? (<React.Fragment>{!this.state.displayslots ? (
            <React.Fragment>
          {this.state.unapproved.map((appt) => (
            <UserCard
              user={this.props.user}
              rejectSlot={this.rejectSlot}
              approveSlot={this.approveSlot}
              appt={appt.user}
              slot={appt.slot}
            />
          ))}</React.Fragment>) : (
            <div className="table-container">
                  <div className="table">
                    {this.state.slots.filter(slot => time1<slot.slice(0,5)).map(
                     (slot)  => (
                        <button value={slot} className="time-slots" onClick={(e) => this.handleSlots(e)}>
                          {" "}
                          {slot}{" "}
                        </button>
                      )
                    )}
                  </div>
                  <button onClick={this.handleReschedule}>
                    CONFIRM
                  </button>
              </div>
          )}</React.Fragment>) : (<h2>Hello! Your appointment is rescheduled</h2>)}
        </div>
        {this.state.upcoming.length>0 ? (
        <div>
          <h5>Upcoming Appointments</h5>
          {this.state.upcoming.map((appt) => (
            <UserCard
              user={this.props.user}
              appt={appt.user}
              slot={appt.slot}
            />
          ))}
        </div>) : null}

        {this.state.past.length>0 ? (
        <div>
          <h5>Past Appointments</h5>
          {this.state.past.map((appt) => (
            <UserCard
              appt={appt.user}
              user={this.props.user}
              slot={appt.slot}
            />
          ))}
        </div>) : null}
      </div>
    );
  }
}

export default withRouter(ExpertApptPage);
