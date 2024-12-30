import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import ClubCard from './components/ClubCard';
import FormModal from './components/FormModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalOpen: false,
            deleteModalOpen: false,
            selectedLocation: '',
            clubs: {
                "Club Arcane": {
                    name: "Club Arcane",
                    location: "League of Legends City",
                    genre: "Rap",
                    max: 100,
                    warning: 70,
                    count: 0,
                },
                "Club Paradisio": {
                    name: "Club Paradisio",
                    location: "Los Angeles",
                    genre: "Jazz",
                    max: 5,
                    warning: 3,
                    count: 0,
                },
                "Club Underground": {
                    name: "Club Underground",
                    location: "Rochester",
                    genre: "Rock",
                    max: 50,
                    warning: 30,
                    count: 0,
                },
                "Club Soda": {
                    name: "Club Soda",
                    location: "NYC",
                    genre: "Pop",
                    max: 20,
                    warning: 12,
                    count: 0,
                },
            },
            newClub: {
                name: '',
                location: '',
                genre: '',
                max: 100,
                warning: 80,
                count: 0,
            },
            deleteClub: '',
            fillInfo: '',
        };
        this.centerItems = "d-flex justify-content-center align-items-center";
    }

    handleIncrement = (clubKey, increment) => {
        let clubs = { ...this.state.clubs }; // clone
        let club = clubs[clubKey];
        const newCount = club.count + increment;
        if (newCount >= 0 && newCount <= club.max)
            club.count = newCount;
        clubs[clubKey] = club;
        this.setState({ clubs: clubs });
    }

    toggleAddModal = () => {
        this.setState({ addModalOpen: !this.state.addModalOpen });
    }

    addClub = () => {
        this.toggleAddModal(); // close the form after submit
        let clubs = { ...this.state.clubs }; // clone
        let newClub = { ...this.state.newClub };
        if (clubs[newClub.name] != null)
            console.log("App.js: handleAddClub", "club with same name already exists, updating info");
        else
            console.log("App.js: handleAddClub", this.state.newClub);
        newClub.count=0;
        clubs[newClub.name] = newClub;
        this.setState({ clubs: clubs });
    }

    handleNewClubInputChange = (inputObj) => {
        const { id, value } = inputObj.target; // takes the id and value attributes of the <input> object
        let club = this.state.newClub;
        club[id] = value;
        this.setState({ newClub: club });
    }

    toggleDeleteModal = () => {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen });
    }

    deleteClub = () => {
        this.toggleDeleteModal(); // close the form after submit
        let clubs = { ...this.state.clubs }; // clone
        delete clubs[this.state.deleteClub];
        this.setState({ clubs: clubs });
        console.log("App.js: deleteClub", this.state.deleteClub);
    }

    deleteClubInputChange = (inputObj) => {
        const { value } = inputObj.target; // takes the id and value attributes of the <input> object
        this.setState({ deleteClub: value });
    }

    fillInfoInputChange = (inputObj) => {
        const { value } = inputObj.target; // selected club name (key)
        if (value) {
            const selectedClub = this.state.clubs[value]; // get club details
            this.setState({
                fillInfo: value,
                newClub: { ...selectedClub }, // fill the form with the data (the form uses newClub as state to store its values)
            });
        } else {
            // reset fields if select nothing.
            this.setState({
                fillInfo: '',
                newClub: {
                    name: '',
                    location: '',
                    genre: '',
                    max: 100,
                    warning: 80,
                    count: 0,
                },
            });
        }
    }

    handleLocationFilterChange = (inputObj) => {
        const { value } = inputObj.target;
        this.setState({ selectedLocation: value });
    }

    render() {
        const { clubs, selectedLocation, newClub } = this.state;

        const filteredClubs = Object.entries(clubs).filter(([key, club]) => {
            return selectedLocation ? club.location === selectedLocation : true;
        });

        return (
            <Container className='text-center'>
                <Row>
                    <Col className='m-4'>
                        <h1> Nightclub Capacity Tracker </h1>
                        <h5> Each time someone enters/ leaves the club, select the correct club and click the appropriate button </h5>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <FormGroup>
                            <Label for='location'>Filter By Location</Label>
                            <Input
                                id='location'
                                type='select'
                                value={this.state.selectedLocation}
                                onChange={this.handleLocationFilterChange}
                                className="w-auto d-inline-block ms-2"
                            >
                                <option key="" value="">All Locations</option>
                                {Object.values(clubs).map((club, index) => (
                                    <option key={index} value={club.location}>{club.location}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Form>
                </Row>
                <Row>
                    {filteredClubs.map(([key, club]) => (
                        <Col xs='6' lg='3' key={key}>
                            <ClubCard
                                club={club}
                                clubKey={key}
                                onIncrement={this.handleIncrement}
                            ></ClubCard>
                        </Col>
                    ))}
                </Row>
                <Row className='justify-content-center' xs='4'>
                    <Button className='mx-3' color='primary' onClick={this.toggleAddModal}>Add/Edit a club</Button>
                    <FormModal 
                        title="Add or Edit a club" 
                        isOpen={this.state.addModalOpen} 
                        toggle={this.toggleAddModal} 
                        onSubmit={this.addClub}>
                        <Form>
                            <FormGroup>
                                <Label for='name'>Fill Info</Label>
                                <Input
                                    id='name'
                                    type='select'
                                    value={this.state.fillInfo}
                                    onChange={this.fillInfoInputChange}
                                >
                                    <option key="" value=""></option>
                                    {Object.entries(clubs).map(([key, club]) => (
                                        <option key={key} value={key}>{club.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <p>Add a Club</p>
                            </FormGroup>
                            <FormGroup floating>
                                <Input id='name' value={newClub.name} onChange={this.handleNewClubInputChange} placeholder=''></Input>
                                <Label for='name'>Club Name</Label>
                            </FormGroup>
                            <FormGroup floating>
                                <Input id='location' value={newClub.location} onChange={this.handleNewClubInputChange} placeholder=''></Input>
                                <Label for='location'>Location</Label>
                            </FormGroup>
                            <FormGroup floating>
                                <Input id='genre' value={newClub.genre} onChange={this.handleNewClubInputChange} placeholder=''></Input>
                                <Label for='genre'>Genre</Label>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup floating>
                                        <Input id='max' value={newClub.max} onChange={this.handleNewClubInputChange} placeholder='100'></Input>
                                        <Label for='max'>Max Capacity</Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup floating>
                                        <Input id='warning' value={newClub.warning} onChange={this.handleNewClubInputChange} placeholder='80'></Input>
                                        <Label for='warning'>Warning Threshold</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </FormModal>
                    <Button className='mx-3' color='danger' onClick={this.toggleDeleteModal}>Delete a club</Button>
                    <FormModal title="Delete a club" isOpen={this.state.deleteModalOpen} toggle={this.toggleDeleteModal} onSubmit={this.deleteClub}>
                        <Form>
                            <FormGroup>
                                <Label for='name'>Club Name</Label>
                                <Input
                                    id='name'
                                    type='select'
                                    value={this.state.deleteClub}
                                    onChange={this.deleteClubInputChange}
                                    size={Object.keys(clubs).length}
                                >
                                    {Object.entries(clubs).map(([key, club]) => (
                                        <option key={key} value={key}>{club.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </FormModal>
                </Row>
            </Container>
        );
    }
}

export default App;
