import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, Navbar, NavbarBrand} from "reactstrap";
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import './GamePage.css';
import Loader from "../Test/Loader";
import axios from "axios";
import {baseUrl} from "../utils/constants";
import {api} from "../utils/api";

class GamePage extends Component {
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
        this.startTimer();
        this.question();
        this.answers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.seconds === 0) {
            this.state.questions.map()
            this.props.history.push("/startGame")
        }
    }

    constructor() {
        super();
        this.state = {time: {}, seconds: 1133};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    state = {
        count: 0,
        loading: false,
        questions: [],
        variants: []
    }


    openModal = () => {
        this.setState({showModal: true})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    question = () => {
        axios.get(baseUrl + api.allQuestions).then(res => {
            this.setState({
                questions: res.data

            })
            console.log(this.state.questions);
        }).catch(err => {
            console.log(err);
        })
    }
    answers = () => {
        axios.get(baseUrl + api.allVariants)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    isCorrect = (e, v) => {
        axios.get(baseUrl + api.variantniTekshirish, v).then(res => {
            // this.setState(res.data.)
            // console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }


    render() {

        const {loading} = this.state;
        const {questions} = this.state;

        return loading ? (
            <Loader/>) : (
            <div className="body-game">
                <div className="container">
                    <div className="border-bottom ">
                        <Navbar className="col-md-12 help-buttons justify-content-between">
                            <NavbarBrand>
                                <Link to="/gameStartAdmin" className="nav-link">
                                    <h2 className="ml-5">Millioner</h2>
                                </Link>
                            </NavbarBrand>
                            <div className="call">
                                <button onClick={this.openModal} className="nav-link btn btn-success">
                                    <i className="fas fa-phone-volume"/></button>
                            </div>
                            <div>
                                <Link to="/gameDo`stlardan" className="nav-link btn btn-success">
                                    <i className="fas fa-users"/></Link>
                            </div>
                            <div>
                                <Link to="/admindanSo`rash" className="nav-link btn btn-success">
                                    <i className="fab fa-battle-net"/></Link>
                            </div>


                        </Navbar>
                    </div>
                </div>

                <div className="container answer-1">
                    {questions?.map((items, index) =>
                        <div className="row">
                            <div className="col-md-6 text-center mx-auto question">
                                <h2 className="mb-3">
                                    {items.questionName}
                                </h2>
                                <h3>{index + 1}-savol: {items.question}</h3>
                            </div>
                        </div>
                    )}
                    <div className="row variant">
                        <div className="col-md-5 answer">
                            <button onClick={this.isCorrect} className="btn btn-success mb-5">a) Toshkent</button>
                            <button className="btn btn-success">b) Samarqand</button>
                        </div>
                        <div className="col-md-2 answer">
                            <h5>
                                {this.state.time.m} : {this.state.time.s}
                            </h5>
                        </div>
                        <div className="col-md-5 answer">
                            <button className="btn btn-success mb-5">c) Andijon</button>
                            <button className="btn btn-success">d) Xorazm</button>
                        </div>
                    </div>
                </div>
                <footer color="blue" className="font-small">
                    <div className="footer-copyright text-center ">
                        <Container fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="/" className="nav-link"
                                                                            style={{color: "black"}}>azamatazadov112@gmail.com</a>
                        </Container>
                    </div>
                </footer>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader className="call-header">
                        <h3>Who do you call</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Container className="call-body">
                            <Row className="text-center">
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"></i>
                                    <h5>Azamat Azadov</h5>
                                    <a href="https://www.instagram.com/azadov_azamat_life/" className="btn btn-success"><i
                                        className="fas fa-phone-volume"/> Call</a>
                                </Col>
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"></i>
                                    <h5>Shaxrizoda Abdullayeva</h5>
                                    <a href="/wsfdcfae" className="btn btn-success">
                                        <i className="fas fa-phone-volume"/>
                                        Call
                                    </a>
                                </Col>
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"/>
                                    <h5>Ulug`bek Ayitboyev</h5>
                                    <a href="https://www.instagram.com/ulugbek_ayitboyev/"
                                       className="btn btn-success"><i className="fas fa-phone-volume"/> Call</a>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col xs={6} md={4}>
                                    <i className="mt-1 fab fa-user-circle"/>
                                    <h5>Zuxra Kamaraddinova</h5>
                                    <a href="" className="btn btn-success"><i className="fas fa-phone-volume"/> Call</a>
                                </Col>
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"/>
                                    <h5>Alisher Sultanov</h5>
                                    <a href="https://www.instagram.com/alisher_sultanoff/"
                                       className="btn btn-success"><i className="fas fa-phone-volume"/> Call</a>
                                </Col>
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"/>
                                    <h5>Tohir Isnatdinov</h5>
                                    <a href="https://www.instagram.com/tohir_isnatdinov/" className="btn btn-success"><i
                                        className="fas fa-phone-volume"/> Call</a>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"/>
                                    <h5>Odilbek Ne`matullayev</h5>
                                    <a href="" className="btn btn-success"><i className="fas fa-phone-volume"/> Call</a>
                                </Col>
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"/>
                                    <h5>Shaxriyor Baxtiyarov</h5>
                                    <a href="https://www.instagram.com/shaxriyor_0001/" className="btn btn-success"><i
                                        className="fas fa-phone-volume"/> Call</a>
                                </Col>
                                <Col xs={6} md={4}>
                                    <i class="mt-1 fas fa-users"/>
                                    <h5>Erkin Erkabayev</h5>
                                    <a href="https://www.instagram.com/boy_ota_001/" className="btn btn-success"><i
                                        className="fas fa-phone-volume"/> Call</a>
                                </Col>
                            </Row>
                            <hr/>
                        </Container>
                        <button onClick={this.closeModal} className="btn btn-danger cansel-btn">cansel</button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default GamePage;