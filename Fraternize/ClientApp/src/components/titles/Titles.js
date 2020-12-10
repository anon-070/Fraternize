import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Titles extends Component {

    state = {
        titles: [], modal: false
    };

    selectedTitleId;
    selectedTitle = {};

   constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        axios.get(`api/Titles`)
            .then(res => {
                const titles = res.data;
                this.setState({ titles });
            })
    };

    toggle = (titleId) => {
        this.setState({ modal: !this.state.modal });
        this.selectedTitleId = titleId;
        this.selectedTitle = this.state.titles.find(element => element.titleId == titleId);
        if (this.selectedTitle == undefined) this.selectedTitle = {};
    }

    deleteItem = () => {
        const newstate = this.state.titles.filter(x => x.titleId != this.selectedTitleId);
        this.setState({
            titles: newstate
        });
        axios.delete(`api/Titles/${this.selectedTitleId}`);

        this.toggle();

           
    }

    render() {

        return (
            <div>
                <h2 className="heading">Titles - Index</h2>

                <p>
                    <Link to="/titles/create" className="btn btn-primary">Create New</Link>
                </p>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Title Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.titles.map(title => <tr key={title.titleId}><td>{title.name}</td><td>
                            <Link className="btn btn-default" to={`/titles/edit/${title.titleId}`}>Edit</Link>
                            <Link className="btn btn-default" to={`/titles/details/${title.titleId}`}>Details</Link>
                            <Button color="danger" onClick={() => this.toggle(title.titleId)}>Delete</Button>
                        </td></tr>)}
                         
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure you want to delete this item?</ModalHeader>
                    <ModalBody>
                        Title Name: {this.selectedTitle.name}
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
