import React, {Component, useEffect, useState} from 'react';
import {Col, Container, Navbar, NavbarBrand, Row, Table} from "reactstrap";
import axios from "axios";
import {baseUrl} from "../../utils/constants";
import {api} from "../../utils/api";
import {render} from "@testing-library/react";

class ClientFriends extends Component {
    componentDidMount() {
        this.allUser();
    }

    state = {
        users: []
    }
    allUser = () => {
        axios.get(baseUrl+api.allUsers).then(jovob => {
            console.log(jovob.data);
            this.setState({
                users: jovob.data
            })
        })
    }


//
// function ClientFriends() {
//
//     useEffect(() => {
//         allUser();
//     })
//
//     const [users, setUser] = useState([])
//
//     function allUser() {
//         axios.get(baseUrl + api.allUsers).then(jovob => {
//             console.log(jovob.data);
//             setUser({
//                 users: jovob.data
//             })
//             console.log(setUser())
//         })
//     }
//
    render() {
        const {users} = this.state
        return (
            <Container>
                <Row>
                    <Col md={12} className="mt-3">
                        <Table className="table table-bordered">
                            <div>
                                <tr>
                                    <th style={{width: '40vh'}}>Friends</th>
                                    <th style={{width: '100vh'}}>azamat</th>

                                </tr>
                                {users.map((ketmon, i) =>

                                    <tr>
                                        <td>{ketmon.firstName}</td>
                                        <td></td>
                                    </tr>
                                )}
                            </div>


                        </Table>
                    </Col>
                    {/*<Col md={8}>*/}
                    {/*    <Table className="table table-bordered">*/}
                    {/*        <tr>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*            <th>azamat</th>*/}
                    {/*        </tr>*/}
                    {/*    </Table>*/}
                    {/*</Col>*/}

                </Row>
            </Container>
        );
    }
}

export default ClientFriends;