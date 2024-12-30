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
            clubs: '',
            addModalOpen: false,
            deleteModalOpen: false,
            selectedLocation: '',
            // clubs: {
            //     "Club Arcane": {
            //         name: "Club Arcane",
            //         location: "League of Legends City",
            //         genre: "Rap",
            //         max: 100,
            //         warning: 70,
            //         count: 0,
            //     },
            //     "Club Paradisio": {
            //         name: "Club Paradisio",
            //         location: "Los Angeles",
            //         genre: "Jazz",
            //         max: 5,
            //         warning: 3,
            //         count: 0,
            //     },
            //     "Club Underground": {
            //         name: "Club Underground",
            //         location: "Rochester",
            //         genre: "Rock",
            //         max: 50,
            //         warning: 30,
            //         count: 0,
            //     },
            //     "Club Soda": {
            //         name: "Club Soda",
            //         location: "NYC",
            //         genre: "Pop",
            //         max: 20,
            //         warning: 12,
            //         count: 0,
            //     },
            // },
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

    // for server
    updateData = (apiResponse) => {
        this.setState({clubs: apiResponse});
    }
    // for server
    fetchData = () => {
        // all clubs
        fetch('http://localhost:5000/clubs_api')
        .then(
            (response) => {
                if (response.status === 200) {
                    return (response.json()) ;
                }
                else {
                    console.log("HTTP error:" + response.status + ":" +  response.statusText);
                    return ([ ["status ", response.status]]);
                }
            }
            )//The promise response is returned, then we extract the json data
        .then ((jsonOutput) => //jsonOutput now has result of the data extraction
            {
            // Transform array of arrays to object of objects(?)
            const formattedData = Object.fromEntries(
                jsonOutput.map(([id, name, location, genre, max, warning, count]) => [
                    name,
                    { name, location, genre, max, warning, count },
                ])
            );
            this.updateData(formattedData);
            }
        )
        .catch((error) => {
            console.log(error);
            this.updateData("");
        } )
    
    }
    // for server
    putData = (data) => {
        // 1 club
        fetch('http://localhost:5000/clubs_api', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert data to JSON string
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("HTTP error: " + response.status + ": " + response.statusText);
                return { status: response.status };
            }
        })
        .then((jsonOutput) => {
            // Handle the response data
            const formattedData = Object.fromEntries(
                jsonOutput.map(([id, name, location, genre, max, warning, count]) => [
                    name,
                    { name, location, genre, max, warning, count },
                ])
            );
            console.log('Updated data:', formattedData);
            this.updateData(formattedData); // Update with the response data
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    };    
    postData = (data) => {
        fetch('http://localhost:5000/clubs_api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert data to JSON string
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("HTTP error: " + response.status + ": " + response.statusText);
                return { status: response.status };
            }
        })
        .then((jsonOutput) => {
            // parse response into state format
            const formattedData = Object.fromEntries(
                jsonOutput.map(([id, name, location, genre, max, warning, count]) => [
                    name,
                    { name, location, genre, max, warning, count },
                ])
            );

            // update state
            this.setState((prevState) => ({
                clubs: {
                    ...prevState.clubs,
                    ...formattedData,
                },
            }));
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    };
    deleteData = (data) => {
        console.log('deleteData()', data);
        const url = 'http://localhost:5000/clubs_api?name='+data;
        fetch(url, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("HTTP error: " + response.status + ": " + response.statusText);
                return { status: response.status };
            }
        })
        .then((jsonOutput) => {
            // parse response into state format
            const formattedData = Object.fromEntries(
                jsonOutput.map(([id, name, location, genre, max, warning, count]) => [
                    name,
                    { name, location, genre, max, warning, count },
                ])
            );

            // update state
            this.setState((prevState) => ({
                clubs: {
                    // ...prevState.clubs,
                    ...formattedData,
                },
            }));
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    };
    
    // for server
    componentDidMount(){
        this.fetchData();
    }

    handleIncrement = (clubKey, increment) => {
        let clubs = { ...this.state.clubs }; // clone
        let club = clubs[clubKey];
        const newCount = club.count + increment;
        if (newCount >= 0 && newCount <= club.max)
            club.count = newCount;
        clubs[clubKey] = club;
        // console.log("handleIncrement", club)
        // this.setState({ clubs: clubs });
        this.putData(club);
    }

    toggleAddModal = () => {
        this.setState({ addModalOpen: !this.state.addModalOpen });
    }

    addClub = () => {
        this.toggleAddModal();
        const newClub = { ...this.state.newClub, count: 0 };
        this.postData(newClub);
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
        const deleteClub = this.state.deleteClub;
        this.deleteData(deleteClub);
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

        // get unique locations
        const locations = [...new Set(Object.values(clubs).map(club => club.location))];

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
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
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


    // for server
    // render(){
    //     /*If the data has not yet been loaded from the server, return empty page */
    //     if ( this.state.data === null || this.state.data === "")
    //         return (<div><p>No data returned from server</p></div>)
    //     else
    //     {
    //     return (
    //         <div>
    //             <div><h2>The api response is: </h2>
    //             {
    //                 Object.keys(this.state.data).map(i => 
    //                         <div>
    //                            { this.state.data[i].map(x => x + ";" )};
    //                         </div>
    //                     )
    //             }
    //             </div>
    //         </div>
    //     )
    //     }
    // }
}

export default App;
