import React, { Component } from 'react';
import './App.css';
import Headings from "./components/Headings";
import Status from "./components/Status";
import Selection from './components/Selection';
import IncrementButton from './components/IncrementButton';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            club: null,
        };
        // Create refs for each Status component to handle changing count.
        this.statusRefs = {
            "Club Arcane": React.createRef(),
            "Club Paradisio": React.createRef(),
            "Club Underground": React.createRef(),
            "Club Soda": React.createRef(),
        };
    }

    handleSelect = (clubName) => {
        this.setState({ club: clubName });
        console.log(clubName, "selected");
    }

    handleIncrement = (increment) => {
        const club = this.state.club;
        if (club && this.statusRefs[club].current) {
            this.statusRefs[club].current.incrementCount(increment);
        }
    }

    render() {
        return (
            <div className="App">
                <Headings />
                <div id="statuses">
                    <Status ref={this.statusRefs["Club Arcane"]} name="Club Arcane" max={100} warning={70} />
                    <Status ref={this.statusRefs["Club Paradisio"]} name="Club Paradisio" max={50} warning={30} />
                    <Status ref={this.statusRefs["Club Underground"]} name="Club Underground" max={20} warning={12} />
                    <Status ref={this.statusRefs["Club Soda"]} name="Club Soda" max={52} warning={32} />
                </div>
                <div id="selection">
                    <div id="choices">
                        <Selection name="Club Arcane" onSelect={this.handleSelect}/>
                        <Selection name="Club Paradisio" onSelect={this.handleSelect}/>
                        <Selection name="Club Underground" onSelect={this.handleSelect}/>
                        <Selection name="Club Soda" onSelect={this.handleSelect}/>
                    </div>
                    <div>
                        <IncrementButton text="+" increment={1} onClick={this.handleIncrement}/>
                        <IncrementButton text="-" increment={-1} onClick={this.handleIncrement}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
