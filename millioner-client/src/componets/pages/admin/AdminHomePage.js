import React, {Component} from 'react';
import {baseUrl, TOKEN_ADMIN} from "../../utils/constants";
import {Modal, ModalBody, ModalHeader, Navbar, NavbarBrand} from "reactstrap";
import {Link} from "react-router-dom";
import {Col, Container, Form, FormControl, Row} from "react-bootstrap";
import './GameStartAdmin.css';
import {AvField, AvForm} from "availity-reactstrap-validation";
import axios from "axios";
import {api} from "../../utils/api";

class AdminHomePage extends Component {
    state = {
        firstName: [],
        lastName: [],
        phoneNumber: [],
        password: [],
        currentUser:[]
    }

    componentDidMount() {

        let headers={
            "Content-type":"application/json",
            "Authorization":localStorage.getItem(TOKEN_ADMIN)
        }

        if (!localStorage.getItem(TOKEN_ADMIN)) {
            this.props.history.push("/register")
        }else{
            localStorage.getItem(TOKEN_ADMIN)
           // axios({
           //     url: baseUrl+api.editUser,
           //     method: 'GET',
           //     data: {headers}
           // })

            axios.get(baseUrl+api.userMe,{headers}).then(res=>{
                console.log(res);
            })
        }
    }

    openModal = () => {
        this.setState({showModal: true})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    logOut = () => {
        this.props.history.push("/")
        localStorage.clear();
    }

    addQuestion = () => {
        this.props.history.push("/addQuestion")
    }

    allUsers = () => {
        this.props.history.push("/allUsers")
    }

    allQuestions = () => {
        this.props.history.push("/allQuestion")
    }

    startGame = () => {
        this.props.history.push("/startGame")
    }

    editAdmin = (user) => {
        this.openModal();
        localStorage.getItem(TOKEN_ADMIN)
        this.setState({currentUser:user})
        axios.put(baseUrl+api.editUser+this.state.currentUser).
            then(jovob=>{
            console.log(jovob);
        }).catch(err=>{
            console.log(err);
        })
    }

    chats=()=>{
        this.props.history.push("/startGame")
    }


    render() {

        console.log(this.state.currentUser)

        return (
            <div className="body-admin">
                <div className="border-bottom border-top ">
                    <Navbar className="col-md-12  navbar-client justify-content-between">
                        <NavbarBrand>
                            <Link to="/gameStartAdmin" className="nav-link">
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
                                <h5>Admin</h5>
                            </Link>
                        </div>

                    </Navbar>
                </div>
                <div className="div-body">
                    <div>
                        <div className="col-md-12  button">
                                <div className="col-md-3 text-center mx-auto ">
                                    <div className="row">
                                        <div className="col-12  text-danger text-right">
                                            <button onClick={this.chats} class="btn btn-outline-primary chats">
                                                <i className="fas fa-sms"/>
                                            </button>

                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={this.startGame} href="/startGame" className="btn btn-danger start">
                                            Start Game
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={this.allQuestions} className="btn btn-warning AllQ">
                                            All Questions
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={this.addQuestion} className="btn btn-warning AddQ">
                                            Add Question
                                        </button>
                                    </div>
                                    <div>
                                        <button className="btn btn-warning settings">
                                            Settings
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={this.allUsers} className="btn btn-success AllU">
                                            All Clients
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <footer color="blue" className="font-small">
                    <div className="footer-copyright text-right">
                        <Container fluid>
                   <a href="https://gmail.com/azamatazadov112@gmail.com/" className="nav-link" style={{color: "black"}}>azamatazadov112@gmail.com</a>
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
                {/*<Modal isOpen={this.state.showModal}>*/}
                {/*    <ModalHeader>*/}
                {/*        <Navbar className="modal-header1">*/}
                {/*            <NavbarBrand className="logOut text-dark">*/}
                {/*                <h3>Settings</h3>*/}
                {/*            </NavbarBrand>*/}
                {/*            <div onClick={this.logOut}>*/}
                {/*                <Link*/}
                {/*                    className="nav-link text-danger">*/}
                {/*                    <h5>Log Out</h5>*/}
                {/*                </Link>*/}
                {/*            </div>*/}

                {/*        </Navbar>*/}
                {/*    </ModalHeader>*/}
                {/*    <ModalBody>*/}
                {/*        <AvForm onValidSubmit={this.editAdmin}>*/}
                {/*            <AvField*/}
                {/*                name="firstName"*/}
                {/*                label="First name"*/}
                {/*                placeholder="Your name"*/}
                {/*                defaultValue={this.state.currentUser.firstName}*/}
                {/*                validate={{*/}
                {/*                    required: {*/}
                {/*                        value: true,*/}
                {/*                        errorMessage: "Iltimos Ismingizni kiriting"*/}
                {/*                    }*/}
                {/*                }}/>*/}
                {/*            <AvField*/}
                {/*                name="lastName"*/}
                {/*                label="Last name"*/}
                {/*                defaultValue={this.state.currentUser.lastName}*/}
                {/*                placeholder="Your surname"*/}
                {/*            />*/}
                {/*            <AvField*/}
                {/*                name="phoneNumber"*/}
                {/*                label="Phone number"*/}
                {/*                defaultValue={this.state.currentUser.phoneNumber}*/}
                {/*                placeholder="Ex. +998997711177"*/}
                {/*                type="text"*/}
                {/*                validate={{*/}
                {/*                    required: {*/}
                {/*                        value: true,*/}
                {/*                        errorMessage: "Iltimos telefon raqamingizni kiriting"*/}
                {/*                    }*/}
                {/*                }}/>*/}
                {/*            <AvField*/}
                {/*                name="password"*/}
                {/*                label="Create password"*/}
                {/*                defaultValue={this.state.currentUser.password}*/}
                {/*                placeholder="Ex.Root1234"*/}
                {/*                type="password"*/}
                {/*                validate={{*/}
                {/*                    required: {*/}
                {/*                        value: true,*/}
                {/*                        errorMessage: "Iltimos parol kiriting"*/}
                {/*                    }*/}
                {/*                }}/>*/}
                {/*            <div className="text-right">*/}
                {/*                <button className="btn btn-success m-1">Edited</button>*/}
                {/*                <button className="btn btn-danger" onClick={this.closeModal}>Canceled</button>*/}
                {/*            </div>*/}
                {/*        </AvForm>*/}
                {/*    </ModalBody>*/}
                {/*</Modal>*/}
            </div>
        );
    }
}

export default AdminHomePage;
