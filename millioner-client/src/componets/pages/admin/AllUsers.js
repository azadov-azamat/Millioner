import React, {Component} from 'react';
import {Col, Container, Row} from "reactstrap";
import axios from "axios";
import {baseUrl} from "../../utils/constants";
import {api} from "../../utils/api";

class AllUsers extends Component {
    componentDidMount() {
        this.allUser()
    }

    state = {
        users: [],
        currentUser: ''
    }

    allUser = () => {
        axios.get(baseUrl + api.allUsers).then(jovob => {
            // console.log(jovob.data);
            this.setState({
                users: jovob.data
            })
        })
    }
    deleteUser = () => {
        axios({
            url: baseUrl+api.deleteUserForAdmin,
            method: "DELETE",
            data: this.state.currentUser
        })
        console.log(this.state.currentUser)
    }

    render() {

        const {users} = this.state;


        return (
            <Container className="text-center">
                <Row className="mt-3">
                    <Col md={12}>
                        <h1>Users List</h1>
                        <table className="table table-bordered">
                            <tr>
                                <th style={{width: "13px"}}>Tr</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone number</th>
                                <th>nimadir</th>
                            </tr>

                            {users.map((ketmon, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{ketmon.firstName}</td>
                                    <td>{ketmon.lastName}</td>
                                    <td>{ketmon.phoneNumber}</td>
                                    <td>
                                        <button defaultValue={this.state.currentUser} onClick={this.deleteUser} className="btn btn-danger">Delete user</button>
                                    </td>
                                </tr>
                            )}
                        </table>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default AllUsers;