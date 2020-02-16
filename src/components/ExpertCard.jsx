import React, { Component } from 'react'

export default class ExpertCard extends Component {
    render() {
        return (
            <div>
                {this.props.pic}
                {this.props.name}
                {this.props.university}
                Description
                {this.props.bio}
                {this.props.pic}
                Slots 
                Dates
            </div>
        )
    }
}
