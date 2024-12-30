import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Button } from 'reactstrap';

class ClubCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addButtonDisabled: props.club.count >= props.club.max, // Disable + button if count is max
            subButtonDisabled: props.club.count <= 0, // Disable - button if count is 0
            color: "aquamarine", // Default color
        }
    }

    handleClick = (increment) => {
        const { club, clubKey } = this.props;
        const newCount = club.count + increment;

        // Calculate the new color and button state before updating
        let newColor = "aquamarine";
        let newAddButtonDisabled = false;
        let newSubButtonDisabled = false;

        if (newCount >= club.max) {
            newAddButtonDisabled = true;
            newColor = "LightCoral";
        } else if (newCount <= 0) {
            newSubButtonDisabled = true;
            newColor = "aquamarine"; // Reset to default color
        } else if (newCount >= club.warning) {
            newColor = "Yellow";
        }

        // update card staae
        this.setState({
            addButtonDisabled: newAddButtonDisabled,
            subButtonDisabled: newSubButtonDisabled,
            color: newColor
        });

        // update in app
        this.props.onIncrement(clubKey, increment);
    }

    render() {
        const { club } = this.props;

        return (
            <Card className='mb-4' style={{ backgroundColor: this.state.color }}>
                <CardBody className='p-2'>
                    <CardTitle tag='h5'>{club.name}</CardTitle>
                    <CardSubtitle>{club.location}</CardSubtitle>
                    <CardSubtitle>{club.genre}</CardSubtitle>
                    <Row className='m-0' xs='3'>
                        <Button 
                            className="border" 
                            color='primary' 
                            onClick={() => this.handleClick(1)} 
                            disabled={this.state.addButtonDisabled}
                        >
                            +
                        </Button>
                        <h1>{club.count}</h1>
                        <Button 
                            className="border" 
                            color='danger' 
                            onClick={() => this.handleClick(-1)} 
                            disabled={this.state.subButtonDisabled}
                        >
                            -
                        </Button>
                    </Row>
                </CardBody>
            </Card>
        )
    }
} 

export default ClubCard;
