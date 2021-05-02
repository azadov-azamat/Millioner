import React, {Component} from 'react';
import {baseUrl, TOKEN_ADMIN, TOKEN_CLIENT} from "../../utils/constants";
import {Modal, ModalBody, ModalHeader, Navbar, NavbarBrand} from "reactstrap";
import {Link} from "react-router-dom";
import {Col, Container, Form, FormControl, Row} from "react-bootstrap";
import './GameHomePage.css';
import {AvField, AvForm} from "availity-reactstrap-validation";
import axios from "axios";
import {api} from "../../utils/api";

class GameHomePage extends Component {
    state = {
        firstName: [],
        lastName: [],
        phoneNumber: [],
        password: [],
        currentUser: []
    }

    componentDidMount() {

        const headers = {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem(TOKEN_CLIENT)
        }

        if (!localStorage.getItem(TOKEN_CLIENT)) {
            this.props.history.push("/register")
        } else {
            axios.get(baseUrl + api.userMe, {headers}).then(jovob => {
                console.log(jovob.data)
            })
        }
    }

    openModal = () => {
        this.setState({showModal: true})
    }
    closeModal = () => {
        this.setState({showModal: false})
    }
     friends = () => {
         this.props.history.push("/clientFriends")
    }
    logOut = () => {
        this.props.history.push("/")
        localStorage.clear();
    }
    editAdmin = (e, user) => {
        this.openModal();
        this.setState({currentUser: user})
    }

    render() {


        return (
            <div className="body">
                <div className="border-bottom border-top mt-2">
                    <Navbar className="col-md-12  navbar-client justify-content-between">
                        <NavbarBrand>
                            <Link to="/gameHomePageClient" className="nav-link">
                                <h2 className="ml-3">Millioner</h2>
                            </Link>
                        </NavbarBrand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="text-center mx-auto mr-sm-2 "/>
                        </Form>
                        <div onClick={this.openModal}>
                            <Link
                                className="nav-link profile text-center">
                                <div className="icon">
                                    <i className="far fa-user-circle"/>
                                </div>
                                <h5>Client </h5>
                            </Link>
                        </div>

                    </Navbar>
                </div>
                <div>
                    <div className="container">
                        <div className="row btn-style">
                            <div className="col-md-3">
                                <div>
                                    <button onClick={this.settingsPage} className="btn-1 btn btn-warning">Sozlamalar
                                    </button>
                                </div>
                            </div>

                            <div className="col-md-3 mx-auto text-center">

                                <div>
                                    <a href="/startGame" className="btn-2 btn btn-danger">Start Game</a>
                                </div>
                                <div className="text">
                                </div>
                            </div>

                            <div className="col-md-3 ">
                                <div>
                                    <button onClick={this.friends} className="btn-3 btn btn-success">Friends</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <footer color="blue" className="font-small">
                    <div className="footer-copyright text-center py-3">
                        <Container fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="/" className="nav-link"
                                                                            style={{color: "black"}}>azamatazadov112@gmail.com</a>
                        </Container>
                    </div>
                </footer>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        <Navbar className="modal-header1">
                            <NavbarBrand className="logOut text-dark">
                                <h3>Edit Profile</h3>
                            </NavbarBrand>
                            <div onClick={this.logOut}>
                                <Link
                                    className="nav-link text-danger">
                                    <h5>Log Out</h5>
                                </Link>
                            </div>

                        </Navbar>
                    </ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={this.editAdmin}>
                            <AvField
                                name="firstName"
                                label="First name"
                                placeholder="Your name"
                                defaultValue={this.state.currentUser.firstName}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Iltimos Ismingizni kiriting"
                                    }
                                }}/>
                            <AvField
                                name="lastName"
                                label="Last name"
                                defaultValue={this.state.currentUser.lastName}
                                placeholder="Your surname"
                            />
                            <AvField
                                name="phoneNumber"
                                label="Phone number"
                                defaultValue={this.state.currentUser.phoneNumber}
                                placeholder="Ex. +998997711177"
                                type="text"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Iltimos telefon raqamingizni kiriting"
                                    }
                                }}/>
                            <AvField
                                name="password"
                                label="Create password"
                                defaultValue={this.state.currentUser.password}
                                placeholder="Ex.Root1234"
                                type="password"
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Iltimos parol kiriting"
                                    }
                                }}/>
                            <div className="text-right">
                                <button className="btn btn-success m-1">Edited</button>
                                <button className="btn btn-danger" onClick={this.closeModal}>Canceled</button>
                            </div>
                        </AvForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default GameHomePage;
