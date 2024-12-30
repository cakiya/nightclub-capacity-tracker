import React from 'react';
import {Component} from 'react';

class Status extends Component {
    static id = 0;

    static ok_status = "Welcome!";
    static ok_color = "aquamarine";
    static warning_status = "Warn the bouncers…";
    static warning_color = "yellow";
    static max_status = "No one allowed in!";
    static max_color = "red";

    constructor(props) {
        super(props);
        this.state = {
            id: Status.id++,
            name: props.name,
            max: props.max,
            warning: props.warning,
            count: 0,
            color: Status.ok_color,
            statusMessage: "",
        };
    }

    incrementCount = (increment) => {
        if (this.state.count + increment >= 0) {
            this.setState({ count: this.state.count + increment }, () => {
                this.updateColor(); // callback aka this will run after that ONLY. this is so stupid.
            });
        }
        
    }

    updateColor = () => {
        const { count, max, warning } = this.state;

        if (count >= max) {
            this.setState({
                color: Status.max_color,
                statusMessage: Status.max_status,
            });
        } else if (count >= warning) {
            this.setState({
                color: Status.warning_color,
                statusMessage: Status.warning_status,
            });
        } else if (count > 0) {
            this.setState({
                color: Status.ok_color,
                statusMessage: Status.ok_status,
            });
        } else {
            this.setState({
                color: Status.ok_color,
                statusMessage: "",
            });
        }
    };

    render() {
        return (
            <div>
                <div style={{ backgroundColor: this.state.color }}>
                    <span>{this.state.name}</span>
                    {
                        this.state.count > 0 ? (
                            <>
                                <br />
                                <span>{this.state.statusMessage}</span>
                            </>
                        ) : null
                    }
                </div>
                <h1>{this.state.count}</h1>
            </div>
        );
    }
}

export default Status;
