import React from 'react';
import {Component} from 'react';

class Selection extends Component {
    static id = 0;

    constructor(props) {
        super(props);
        this.state = {
            "id": Selection.id++,
            "name": props.name,
        }
    }

    handleSelect = () => {
        this.props.onSelect(this.state.name);
    }

    render() {
        return(
            <span>
                <input type="radio" id={this.state.id} name="choice" value={this.state.name} onChange={this.handleSelect}></input>
                <label htmlFor={this.state.id}>{this.state.name}</label>
                <br></br>
            </span>
        )
    }
} 

export default Selection;

