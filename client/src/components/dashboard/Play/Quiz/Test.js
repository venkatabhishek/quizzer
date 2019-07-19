import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ButtonBase from '@material-ui/core/ButtonBase';
import Radio from '@material-ui/core/Radio';

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { findActivity, scoreActivity } from '../../../../utils/api-activity'

import auth from '../../../auth/auth-helper'

const styles = theme => ({
    container: {
        padding: 40
    },
    questionWrapper: {
        marginTop: 40
    },
    answersWrapper: {
        marginTop: 40,
        marginLeft: 50
    },
    answer: {
        width: "100%",
        textAlign: "left",
        margin: 20,
        display: "block",
        padding: 10
    },
    answerContainer: {
        display: "flex",
        margin: 40,
        alignItems: "center"

    },
    navBtn: {
        float: "right",
        margin: 10
    }
})

class Test extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: [],
            title: "",
            category: "",
            current: 0,
            answers: [],
            submit: false,
        }
    }

    edit = () => {
        this.props.history.push('/app/edit?type=q&q=' + this.state._id)
    }

    move = (val) => (e) => {
        var { current, quiz } = this.state;

        if (current == (quiz.length - 1) && val == 1) {
            this.submit();
        } else {
            if (val == -1 && current == 0) {
                val = 0;
            }

            this.setState({
                current: current + val
            })
        }


    }

    submit = () => {
        var p = 0;

        const { quiz, answers } = this.state;

        quiz.map((item, index) => {
            if (item.correct == answers[index]) {
                p++;
            }
        })

        var score = {
            score: p / quiz.length,
            id: this.state._id
        }

        const jwt = auth.isAuthenticated();

        scoreActivity(score, { t: jwt.token }).then(data => {
            var message = ""

            if(data.error){
                message = data.error
            }else{
                message = "Score saved successfully"
            }

            this.setState({
                p,
                submit: true,
                message
            })
        })



    }


    handleChange = (index) => (e) => {

        var { answers, current } = this.state;

        answers[current] = index;

        this.setState({
            answers
        })
    }

    componentWillMount() {
        const values = queryString.parse(this.props.location.search);

        if (values.q) {

            findActivity(values.q).then((data) => {

                var answers = []

                data.quiz.map(item => {
                    answers.push(-1)
                })

                data.answers = answers

                this.setState(data);

            }).catch(err => {
                console.log(err)
            })
        } else {
            this.setState({
                exists: false
            })
        }
    }

    render() {
        const { classes } = this.props;

        const { quiz, title, current, answers, submit, p, message } = this.state;

        if (quiz.length == 0) {
            return (<div></div>)
        }

        if (submit) {
            return (<div style={{ margin: 50 }}>
                <Typography variant="h3">
                    Results
                </Typography>

                <Typography variant="h5" style={{ marginTop: 30 }}>
                    You answered {p} correct out of {quiz.length} questions
                </Typography>
                <Typography variant="h5" style={{ marginTop: 30 }}>
                    {answers.filter(a => a == -1).length} Unanswered
                </Typography>
                <Typography variant="h5" style={{ marginTop: 30 }}>
                    {message}
                </Typography>
            </div>)
        }

        return (
            <div style={{ overflowX: "hidden" }}>
                <Container className={classes.container}>

                    <Typography variant="h4">
                        {title}
                    </Typography>

                    <div className={classes.questionWrapper}>
                        <div>
                            <Typography variant="h5">
                                Q: {quiz[current].question}
                            </Typography>
                            <Typography variant="h5" style={{ float: "right" }}>
                                {current + 1} / {quiz.length}
                            </Typography>
                        </div>

                        <div className={classes.answersWrapper}>
                            {quiz[current].answers.map((item, index) => {
                                return (<div className={classes.answerContainer} key={index}>
                                    <Radio
                                        checked={answers[current] == index}
                                        onChange={this.handleChange(index)}
                                        value={index}
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <span>


                                        <Typography variant="h6" style={{ marginLeft: 40 }}>
                                            {item}
                                        </Typography>
                                    </span></div>)
                            })}
                        </div>

                        <div className={classes.navigation}>
                            <Button variant="contained" color="primary" className={classes.navBtn} onClick={this.move(1)}>
                                {current + 1 == quiz.length ? (<span>Submit</span>) : (<span>Next</span>)}
                            </Button>
                            <Button variant="contained" color="primary" className={classes.navBtn} onClick={this.move(-1)}>
                                Back
                        </Button>
                        </div>
                    </div>

                </Container>


            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Test));