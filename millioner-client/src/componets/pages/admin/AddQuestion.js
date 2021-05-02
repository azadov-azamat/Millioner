import React, {Component, useState} from 'react';
import {Button, Col, Container, CustomInput, Row} from "reactstrap";
import {AvField, AvForm, AvRadio,AvRadioGroup} from 'availity-reactstrap-validation';
import './AddQuestion.css'
import axios from "axios";
import {baseUrl} from "../../utils/constants";
import {api} from "../../utils/api";
import {toast} from "react-toastify";

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionName: '',
            question: '',
            // ketmon: [],
            variantA: '',
            variantB: '',
            variantC: '',
            variantD: '',
            trueOrFalse: '',
            questionId: ''
        }
    }

    question=(e, v)=>{
        console.log(v);
        const vars = [v.variantA, v.variantB, v.variantC, v.variantD];
        axios({
            url: baseUrl+api.addQuestion,
            method: 'POST',
            data: {
                ansTrue: v.ansTrue,
                questionName: v.questionName,
                question: v.question,
                vars

            }
        }).then(jovob=> {
            toast.success(jovob.data.message);
            let b = this.state.value === null;
            // this.props.history.push("/gameStartAdmin")
        }).catch(err=>{
            console.log(err.data)
        })
    }

    render() {
        // console.log(this.state.ketmon)

        return (
            <div className="addQuestionBody">
                <Container>
                    <Row>
                        <Col md={6} className="add-question">
                            <AvForm onValidSubmit={this.question}>
                                <h5 className="text-center">Question name: </h5>
                                <AvField
                                    name="questionName"
                                    placeholder="Question about"
                                    // label="Question name: "
                                    type="text"
                                    validate={{
                                        required: {value: true, errorMessage: "Iltimos savol nomini kiriting kiriting"}
                                    }}/>
                                <h5 className="text-center">Question: </h5>
                                <AvField
                                    name="question"
                                    placeholder="Your question ?"
                                    // label="Question: "
                                    type="text"
                                    validate={{
                                        required: {value: true, errorMessage: "Iltimos savolingizni kiriting"}
                                    }}/>
                                <Container>
                                    <Row >
                                        <Col md={6} className="container">
                                            <AvField
                                                name="variantA"
                                                placeholder="Variant A"
                                                label="A) answer: "
                                                type="text"
                                                validate={{
                                                    required: {value: true, errorMessage: "Iltimos A variantni to`ldiring"}
                                                }}/>
                                            <div>
                                                <AvField
                                                    name="variantB"
                                                    placeholder="Variant B"
                                                    label="B) answer: "
                                                    type="text"
                                                    validate={{
                                                        required: {value: true, errorMessage: "Iltimos B variantni to`ldiring"}
                                                    }}/>
                                            </div>
                                            <AvField
                                                name="variantC"
                                                placeholder="Variant C"
                                                label="C) answer: "
                                                type="text"
                                                validate={{
                                                    required: {value: true, errorMessage: "Iltimos variantni to`ldiring"}
                                                }}/>
                                            <AvField
                                                name="variantD"
                                                placeholder="Variant D"
                                                label="D) answer: "
                                                type="text"
                                                validate={{
                                                    required: {value: true, errorMessage: "Iltimos variantni to`ldiring"}
                                                }}/>
                                        </Col>
                                        <Col md={6} className="container">
                                            <AvRadioGroup name="ansTrue" required errorMessage="Pick one!">
                                                <div className="A-Variant">
                                                    <AvRadio label="isTrue?" value="0"/>
                                                </div>
                                                <div className="B-Variant">
                                                    <AvRadio label="isTrue?" value="1"/>
                                                </div>
                                                <div className="C-Variant">
                                                    <AvRadio label="isTrue?" value="2"/>
                                                </div>
                                                <div className="D-Variant">
                                                    <AvRadio label="isTrue?" value="3" />
                                                </div>
                                            </AvRadioGroup>
                                        </Col>

                                    </Row>
                                </Container>
                                <Button className="btn btn-warning add-question-button">Added</Button>
                                <a href="/gameStartAdmin" className="btn btn-danger add-question-cansel">Cancel</a>
                            </AvForm>
                        </Col>
                        <Col md={6} className="offset-4 text-right offset-2 ">
                            <Container className="examleText">
                                <h2 className="text-center">Add Question</h2>
                                <hr/>
                                <Row>
                                    <div className="col-md-6 text-center mx-auto question-example">
                                        <h5 >O`zbekiston Haqida!</h5>
                                        <h6>1-savol: O`zbekistonning poytaxti?</h6>
                                    </div>
                                </Row>
                                <Row className="d-flex justify-content-between answer-example">
                                    <div className="col-md-5 answer">
                                        <button className="btn btn-success mb-3">a) Toshkent</button>
                                        <button className="btn btn-success">b) Samarqand</button>
                                    </div>
                                    <div className="col-md-5 answer">
                                        <button className="btn btn-success mb-3">c) Andijon</button>
                                        <button className="btn btn-success">d) Xorazm</button>
                                    </div>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default AddQuestion;