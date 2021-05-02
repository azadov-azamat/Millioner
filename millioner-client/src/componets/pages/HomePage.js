import React, {Component} from 'react';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';
import {Button, Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {LANGUAGE, TOKEN_ADMIN} from "../utils/constants";


class HomePage extends Component {

    login = () => {
        axios.get("/login")
    }
    selectLang=(e,v)=>{
        // localStorage.setItem(heas);
        console.log(v)
    }

    render() {
        return (
            <div className="home-page">
                <div className="border-bottom border-top">
                    <Navbar className="col-md-12  navbar-1 justify-content-between">
                        <NavbarBrand>
                            <Link to="/" className="nav-link">
                                <h2 className="ml-5">Millioner</h2>
                            </Link>

                        </NavbarBrand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="text-center mr-sm-2 "/>
                        </Form>
                        <Link to="/login" className="nav-link btn btn-danger mr-4 btn-login">Login</Link>
                    </Navbar>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="text-1 col-md-4 offset-1 text-center ">
                            <h1>Assalomu Aleykum</h1>
                            <p><h5>"Kim millioner bo`lishni xoxlaydi?" Tele shou o`yiniga xush kelibsiz!!! Bu o`yin
                                orqali siz o`z bilimingizni yanada rivojlantirasiz degan umiddamiz. Bu o`yin Test shaklida
                                ishlab chiqildi, Sizga yoqadi degan umiddaman. Saytdan ro`yxatdan o`tish uchun - bu yerga bosing</h5></p>
                            <a href="/register" className="btn btn-success">Registration</a>
                        </div>
                        <div className="btn-lang1 col-md-8 offset-5">
                            <Button className="btn nav-link lang-1" onClick={this.selectLang} value="UZBEK">Uz</Button>
                            <Button className="btn nav-link lang-2">En</Button>
                            <Button className="btn nav-link lang-3">Ru</Button>
                        </div>
                    </div>
                </div>
                <div className="footer-container mt-5">
                    <NavbarBrand className="text-left  text-white mt-4">
                        <div className="container p-3">
                            <section>
                                <a className="btn btn-outline-dark btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-facebook-f"/>
                                </a>

                                <a className="btn btn-outline-dark btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-twitter"/>
                                </a>

                                <a className="btn btn-outline-dark btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-google"/>
                                </a>

                                <a className="btn btn-outline-dark btn-floating m-1"
                                   href="https://www.instagram.com/azadov_azamat_life/" role="button">
                                    <i className="fab fa-instagram"/>
                                </a>

                                <a className="btn btn-outline-dark btn-floating m-1" href="/" role="button">
                                    <i className="fab fa-linkedin-in"/>
                                </a>
                            </section>
                        </div>
                    </NavbarBrand>
                </div>
            </div>
        );
    }
}

export default HomePage;
