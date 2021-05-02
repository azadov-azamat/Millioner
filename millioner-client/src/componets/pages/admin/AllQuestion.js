import React, {Component} from 'react';
import {Col, Container, Modal, Row, Table} from "reactstrap";
import axios from "axios";
import {baseUrl} from "../../utils/constants";
import {api} from "../../utils/api";
import {Button} from "react-bootstrap";
import './allQuestions.css'

class AllQuestion extends Component {
    componentDidMount() {
        this.allQuestion();
        // this.allVariants();
    }

    state = {
        questions: [],
        savolId: ""

    }
    // allVariants=()=>{
    //     axios({
    //         url: baseUrl + api.allVariants,
    //         method: 'GET',
    //         data: this.state.savolId
    //     }).then(res=>{
    //         // console.log(res);
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // }

    allQuestion = () => {
        axios({
            url: baseUrl + api.allQuestions,
            method: 'GET',
        }).then(jovob => {
            this.setState({
                questions: jovob.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const {questions} = this.state
        const {savolId} = this.state

        return (
            <Container>

                <Row className="mt-5 allQuestions">
                    <Col className={"text-center "}>
                        <h2>All Questions</h2>
                        <Table className="table table-bordered">
                            <tr>
                                <th>Tr</th>
                                <th>Question About</th>
                                <th>Question?</th>
                                <th>variant A</th>
                                <th>variant B</th>
                                <th>variant C</th>
                                <th>variant D</th>
                                <th>Nimadir</th>
                            </tr>
                            {/*{console.log(questions)}*/}
                            {questions.map((ketmon, i) =>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{ketmon.questionName}</td>
                                    <td>{ketmon.question}</td>
                                    {ketmon.variantDtoList && ketmon.variantDtoList.map((item, index)=>
                                        <td>{item.title}</td>
                                    )}
                                    <td><Button className="btn btn-warning" onClick={this.allQuestion}>Edited</Button>
                                        <Button className="btn btn-danger m-1">deleted</Button></td>
                                    {/*{this.setState({savolId: ketmon.id})}*/}
                                </tr>
                            )}
                        </Table>
                    </Col>
                </Row>
                <Modal>

                </Modal>
            </Container>

        );
    }
}

export default AllQuestion;