import React, {Component} from 'react';
import {Button, Navbar, NavbarBrand} from "reactstrap";
import {Form, FormControl} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AvForm, AvField} from 'availity-reactstrap-validation';
import axios from "axios";
import {baseUrl, TOKEN_ADMIN, TOKEN_CLIENT} from "../utils/constants";
import {api} from "../utils/api";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

class Login extends Component {


    render() {

        const login = (e, v) => {
            axios.post(baseUrl + api.loginUrl, v).then(jovob => {
                if (baseUrl+api.loginUrl)
                if (v.phoneNumber === "+998977117711"){
                    localStorage.setItem(TOKEN_ADMIN, "Bearer " + jovob.data)
                    this.props.history.push("/gameStartAdmin")
                }else {
                    localStorage.setItem(TOKEN_CLIENT, "Bearer " + jovob.data)
                    this.props.history.push("/gameHomePageClient")
                }
            }).catch(err => {
                console.log(err)
                // toast.error(err.response.data.message)
            })
        }

        return (
            <div className="login-page">
                <div className="row "/>
                <div className="border-bottom ">
                    <Navbar className="col-md-12  navbar-2 justify-content-between">
                        <NavbarBrand>
                            <Link to="/" className="nav-link">
                                <h2 className="ml-5">Millioner</h2>
                            </Link>
                        </NavbarBrand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="text-center mr-sm-2 "/>
                        </Form>
                        <Link to="/register" className="nav-link btn btn-success mr-4">Registration</Link>
                    </Navbar>
                </div>
                <div className="container form">
                    <div className="row  py-sm-5 login-page-1">
                        <div className="col-md-3 mx-auto my-auto">
                            <AvForm onValidSubmit={login}>
                                <AvField
                                    id="input-1"
                                    name="phoneNumber"
                                    label="Phone number"
                                    type="text"
                                    validate={{
                                        required: {value: true, errorMessage: "Iltimos telefon raqamingizni kiriting"}
                                    }}/>
                                <AvField
                                    id="input-1"
                                    name="password"
                                    label="Your password"
                                    type="password"
                                    validate={{
                                        required: {value: true, errorMessage: "Iltimos parolni kiriting"}
                                    }}/>
                                <AvField
                                    name="checkbox"
                                    label="Sizni eslab qolsinmi?"
                                    type="checkbox"/>
                                <div className="text-right">
                                    <Button color="danger" className="btn mb-5">Submit</Button>
                                </div>
                            </AvForm>
                        </div>
                    </div>
                </div>
                <div className="footer-container mt-4 mx-4">
                    <NavbarBrand className="text-center">
                        <div className="container p-2 ">
                            <section className="pl-lg-5">
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
                            <h5 style={{color: "black"}} className="ml-5">Social medialar yordamida kirishingiz mumkin?</h5>
                        </div>
                    </NavbarBrand>
                </div>
            </div>
        );
    }
}

export default Login;
