import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Button } from 'reactstrap';

class ClubCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addButtonDisabled: props.club.count >= props.club.max, // inequality to cover for the case of creating a club that is already full
            subButtonDisabled: props.club.count <= 0,
            color: "aquamarine",
        }
    }

    handleClick = (increment) => {
        this.props.onIncrement(this.props.clubKey, increment);

        let count = this.props.club.count;
        let atMax = count >= this.props.club.max;
        let atMin = count <= 0;

        if (count >= this.props.club.warning && !atMax) {
            this.setState({ color: "Yellow" });
        } else {
            this.setState({ color: "AquaMarine" });
        }

        if (atMax) {
            this.setState({ addButtonDisabled: true, color: "LightCoral" });
        } else if (atMin) {
            this.setState({ subButtonDisabled: true });
        } else if (this.state.addButtonDisabled !== false || this.state.subButtonDisabled !== false) {
            this.setState({ addButtonDisabled: false, subButtonDisabled: false });
        }        
    }

    render() {
        const { club } = this.props

        return(
            <Card className='mb-4' style={{backgroundColor: this.state.color}}>
                <CardBody className='p-2'>
                    <CardTitle tag='h5'>{club.name}</CardTitle>
                    <CardSubtitle>{club.location}</CardSubtitle>
                    <CardSubtitle>{club.genre}</CardSubtitle>
                    <Row className='m-0' xs='3'>
                        <Button className="border" color='primary' onClick={() => this.handleClick(1)} disabled={this.state.addButtonDisabled}>+</Button>
                        <h1>{club.count}</h1>
                        <Button className="border" color='danger' onClick={() => this.handleClick(-1)} disabled={this.state.subButtonDisabled}>-</Button>
                    </Row>
                </CardBody>
            </Card>
        )
    }
} 

export default ClubCard;

