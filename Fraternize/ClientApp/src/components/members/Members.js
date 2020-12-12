import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class MemberDatas extends Component {

    state = {
        memberDatas: [], modal: false
    };

    selectedMemberDataId;
    selectedMemberData = {};

   constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        axios.get(`api/MemberData`)
            .then(res => {
                const memberDatas = res.data;
                this.setState({ memberDatas });
            })
    };

    toggle = (memberDataId) => {
        this.setState({ modal: !this.state.modal });
        this.selectedMemberDataId = memberDataId;
        this.selectedMemberData = this.state.memberDatas.find(element => element.memberDataId == memberDataId);
        if (this.selectedMemberData == undefined) this.selectedMemberData = {};
    }

    deleteItem = () => {
        const newstate = this.state.memberDatas.filter(x => x.memberDataId != this.selectedMemberDataId);
        this.setState({
            memberDatas: newstate
        });
        axios.delete(`api/MemberData/${this.selectedMemberDataId}`);

        this.toggle();

           
    }

    render() {

        return (
            <div>
                <h2 className="heading">Members - Index</h2>

                <p>
                    <Link to="/members/create" className="btn btn-primary">Create New</Link>
                </p>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Member Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.memberDatas.map(memberData => <tr key={memberData.memberDataId}><td>{memberData.otherNames + " " + memberData.surName}</td><td>
                            <Link className="btn btn-default" to={`/members/edit/${memberData.memberDataId}`}>Edit</Link>
                            <Link className="btn btn-default" to={`/members/details/${memberData.memberDataId}`}>Details</Link>
                            <Button color="danger" onClick={() => this.toggle(memberData.memberDataId)}>Delete</Button>
                        </td></tr>)}
                         
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure you want to delete this item?</ModalHeader>
                    <ModalBody>
                        MemberData Name: {this.selectedMemberData.name}
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
