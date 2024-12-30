import React from 'react';
import {Component} from 'react';

class IncrementButton extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            "text": props.text,
            "increment": props.increment,
        }
    }

    handleIncrement = () => {
        this.props.onClick(this.state.increment);
    }

    render() {
        return(
            <button onClick={this.handleIncrement}>{this.props.text}</button>
        )
    }
} 

export default IncrementButton;

