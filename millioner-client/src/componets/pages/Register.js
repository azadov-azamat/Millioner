import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Navbar, NavbarBrand} from "reactstrap";
import {Form, FormControl} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AvForm, AvField} from 'availity-reactstrap-validation';

import axios from "axios";
import {baseUrl, TOKEN_CLIENT} from "../utils/constants";
import {api} from "../utils/api";
import {toast} from "react-toastify";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            currentUser: []
        }
    }

    openModal = () => {
        this.setState({showModal: true})
    }
    closeModal = () => {
        this.setState({showModal: false})
    }

    render() {

        const register = (e, v) => {
            axios.post(baseUrl + api.registerUrl, v)
                .then(jovob => {
                    console.log(jovob)
                    // alert(jovob.data.object)
                    this.setState({showModal: true, currentUser: jovob.data.object})
                }).catch(err => {
                console.log(err.response)
                toast.error(err.response.data.message);
            })
        }

        const checkSmsCode = (e, v) => {

            axios({
                url: baseUrl + api.checkSmsCodeUrl,
                method: 'POST',
                data: {
                    smsCode: v.smsCode,
                    userId: this.state.currentUser.id
                }
            }).then(jovob => {
                if (baseUrl + api.checkSmsCodeUrl)
                    localStorage.setItem(TOKEN_CLIENT, "Bearer " + jovob.data)
                this.props.history.push("/gameHomePageClient")
            }).catch(err => {
                console.log(err.response.data);
                // toast.error(err.response.data.message);
            })
        }

        return (

            <div className="body-register">
                <div className="border-bottom border-top mt-2">
                    <Navbar className="col-md-12  navbar-1 justify-content-between">
                        <NavbarBrand>
                            <Link to="/" className="nav-link">
                                <h2 className="ml-5">Millioner</h2>
                            </Link>
                        </NavbarBrand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="text-center mr-sm-2 "/>
                        </Form>
                        <Link to="/login" className="nav-link btn-login btn btn-danger mr-4">Login</Link>
                    </Navbar>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mx-auto mt-4 form-1">
                            <AvForm onValidSubmit={
                                register
                            }

                            >
                                <AvField
                                    name="firstName"
                                    label="First name"
                                    placeholder="Your name"
                                    // onChange={getInputValue}
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Iltimos Ismingizni kiriting"
                                        }
                                    }}/>
                                <AvField
                                    name="lastName"
                                    label="Last name"
                                    // onChange={getInputValue}
                                    placeholder="Your surname"
                                />
                                <AvField
                                    name="phoneNumber"
                                    label="Phone number"
                                    placeholder="Ex. +998997711177"
                                    type="text"
                                    // onChange={getInputValue}
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Iltimos telefon raqamingizni kiriting"
                                        }
                                    }}/>
                                <AvField
                                    name="password"
                                    label="Create password"
                                    placeholder="Ex.Root1234"
                                    type="password"
                                    // onChange={getInputValue}
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Iltimos parol kiriting"
                                        }
                                    }}/>
                                <div className="text-center">
                                    <button className="btn btn-success">Send sms Code</button>
                                </div>
                            </AvForm>
                        </div>
                    </div>
                </div>
                <div className="footer-container  mx-4">
                    <NavbarBrand className="text-center  text-white">
                        <div className="container ">
                            <section className="pl-lg-3">
                                <a className="btn btn-outline-info btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-facebook-f"/>
                                </a>

                                <a className="btn btn-outline-dark btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-twitter"/>
                                </a>

                                <a className="btn btn-outline-danger btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-google"/>
                                </a>
                                <a className="btn btn-outline-primary btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-linkedin-in"/>
                                </a>
                            </section>
                            <h5 style={{color: "black"}} className="ml-5">Social medialar yordamida kirishingiz
                                mumkin?</h5>
                        </div>
                    </NavbarBrand>
                </div>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>
                        <h3>Check sms Code</h3>
                    </ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={checkSmsCode}>
                            <AvField name="userId" type="hidden" value={this.state.currentUser.id}/>
                            <AvField
                                name="smsCode"
                                placeholder="Sms codni kiriting"
                                // onChange={getInputValue}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: "Iltimos sms kodni kiriting"
                                    }
                                }}/>
                            <div className="text-right">
                                <Button color="success" className="btn mb-5">Tasdiqlash</Button>
                                <Button color="danger" onClick={this.closeModal} className="btn mb-5">Cancel</Button>
                            </div>
                        </AvForm>
                    </ModalBody>
                </Modal>

            </div>
        )
            ;
    }
}

export default Register;
