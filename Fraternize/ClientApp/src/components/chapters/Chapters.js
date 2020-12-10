import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Chapters extends Component {
    state = {
        chapters: [], modal: false
    };

    selectedChapterId;
    selectedChapter = {};

   constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        axios.get(`api/Chapters`)
            .then(res => {
                const chapters = res.data;
                this.setState({ chapters });
            })
    };

    toggle = (chapterId) => {
        this.setState({ modal: !this.state.modal });
        this.selectedChapterId = chapterId;
        this.selectedChapter = this.state.chapters.find(element => element.chapterId == chapterId);
        if (this.selectedChapter == undefined) this.selectedChapter = {};
    }

    deleteItem = () => {
        const newstate = this.state.chapters.filter(x => x.chapterId != this.selectedChapterId);
        this.setState({
            chapters: newstate
        });
        axios.delete(`api/Chapters/${this.selectedChapterId}`);
        this.toggle();         
    }

    render() {
        return (
            <div>
                <h2 className="heading">Chapters - Index</h2>

                <p>
                    <Link to="/chapters/create" className="btn btn-primary">Create New</Link>
                </p>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Chapter Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.chapters.map(chapter => <tr key={chapter.chapterId} > <td>{chapter.name}</td><td>
                            <Link className="btn btn-default" to={`/chapters/edit/${chapter.chapterId}`}>Edit</Link>
                            <Link className="btn btn-default" to={`/chapters/details/${chapter.chapterId}`}>Details</Link>
                            <Button color="danger" onClick={() => this.toggle(chapter.chapterId)}>Delete</Button>
                        </td></tr>)}
                         
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure you want to delete this item?</ModalHeader>
                    <ModalBody>
                        Chapter Name: {this.selectedChapter.name}
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
