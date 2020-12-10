import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Committees extends Component {

    state = {
        committees: [], modal: false
    };

    selectedCommitteeId;
    selectedCommittee = {};

   constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        axios.get(`api/Committees`)
            .then(res => {
                const committees = res.data;
                this.setState({ committees });
            })
    };

    toggle = (committeeId) => {
        this.setState({ modal: !this.state.modal });
        this.selectedCommitteeId = committeeId;
        this.selectedCommittee = this.state.committees.find(element => element.committeeId == committeeId);
        if (this.selectedCommittee == undefined) this.selectedCommittee = {};
    }

    deleteItem = () => {
        const newstate = this.state.committees.filter(x => x.committeeId != this.selectedCommitteeId);
        this.setState({
            committees: newstate
        });
        axios.delete(`api/Committees/${this.selectedCommitteeId}`);

        this.toggle();

           
    }

    render() {

        return (
            <div>
                <h2 className="heading">Committees - Index</h2>

                <p>
                    <Link to="/committees/create" className="btn btn-primary">Create New</Link>
                </p>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Committee Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.committees.map(committee => <tr key={committee.committeeId}><td>{committee.name}</td><td>
                            <Link className="btn btn-default" to={`/committees/edit/${committee.committeeId}`}>Edit</Link>
                            <Link className="btn btn-default" to={`/committees/details/${committee.committeeId}`}>Details</Link>
                            <Button color="danger" onClick={() => this.toggle(committee.committeeId)}>Delete</Button>
                        </td></tr>)}
                         
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure you want to delete this item?</ModalHeader>
                    <ModalBody>
                        Committee Name: {this.selectedCommittee.name}
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
