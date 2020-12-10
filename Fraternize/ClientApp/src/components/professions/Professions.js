import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Professions extends Component {

    state = {
        professions: [], modal: false
    };

    selectedProfessionId;
    selectedProfession = {};

   constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        axios.get(`api/Professions`)
            .then(res => {
                const professions = res.data;
                this.setState({ professions });
            })
    };

    toggle = (professionId) => {
        this.setState({ modal: !this.state.modal });
        this.selectedProfessionId = professionId;
        this.selectedProfession = this.state.professions.find(element => element.professionId == professionId);
        if (this.selectedProfession == undefined) this.selectedProfession = {};
    }

    deleteItem = () => {
        const newstate = this.state.professions.filter(x => x.professionId != this.selectedProfessionId);
        this.setState({
            professions: newstate
        });
        axios.delete(`api/Professions/${this.selectedProfessionId}`);

        this.toggle();

           
    }

    render() {

        return (
            <div>
                <h2 className="heading">Professions - Index</h2>

                <p>
                    <Link to="/professions/create" className="btn btn-primary">Create New</Link>
                </p>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Profession Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.professions.map(profession => <tr><td key={profession.professionId}>{profession.name}</td><td>
                            <Link className="btn btn-default" to={`/professions/edit/${profession.professionId}`}>Edit</Link>
                            <Link className="btn btn-default" to={`/professions/details/${profession.professionId}`}>Details</Link>
                            <Button color="danger" onClick={() => this.toggle(profession.professionId)}>Delete</Button>
                        </td></tr>)}
                         
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure you want to delete this item?</ModalHeader>
                    <ModalBody>
                        Profession Name: {this.selectedProfession.name}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.deleteItem}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
