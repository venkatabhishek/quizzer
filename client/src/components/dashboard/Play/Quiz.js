import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { findUserProfile } from '../../../utils/api-user'
import { findActivity } from '../../../utils/api-activity'
import auth from '../../auth/auth-helper'


import Test from './Quiz/Test';

const styles = theme => ({
    headText: {
        padding: 55,
        display: "block",
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }
    },
    prevScore: {
        padding: "10px 55px",
        margin: "10px 40px",
        marginBottom: 40
    },
    title: {
        margin: 40,
        display: "inline"
    },
    category: {
        margin: 40
    },
    editBtn: {
        float: "right",
        marginLeft: 20,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 5
        }
    },
    column: {
        margin: "auto"
    },
    box: {
        width: 200,
        minHeight: 100,
        margin: "auto",
        padding: 20,
        marginBottom: 40
    },
    answer: {
        padding: 20,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            width: 300
        }
    },
    question: {
        marginBottom: 40
    },
    correct: {
        outline: "2px solid #4BB543"
    },
    switch: {
        float: "right",
        marginLeft: 20
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center"
        }
    }
})

class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: [],
            title: "",
            category: "",
            test: false,
            showAnswer: false,
            user: null
        }

        this.close.bind(this);
        this.open.bind(this);
    }

    edit = () => {
        this.props.history.push('/app/edit?type=q&q=' + this.state._id)
    }

    close = () => {
        this.setState({
            test: false
        })
    }

    open = () => {
        this.setState({
            test: true
        })
    }

    componentWillMount() {
        const values = queryString.parse(this.props.location.search);

        if (values.q) {

            findActivity(values.q).then((data) => {

                this.setState(data, () => {
                    const jwt = auth.isAuthenticated();

                    findUserProfile(
                        {
                            userId: jwt.user._id
                        },
                        { t: jwt.token }
                    ).then(user => {
                        this.setState({
                            user
                        })
                    });
                })

            }).catch(err => {
                console.log(err)
            })
        } else {
            this.setState({
                exists: false
            })
        }
    }

    changeShow = (e) => {
        this.setState({
            showAnswer: e.target.checked
        })
    }

    render() {
        const { classes } = this.props;

        const { quiz, title, test, showAnswer, user } = this.state;

        var p = -1;

        if(user && this.state._id){
            var q = user.scores[this.state._id];
            if(p){
                p = q;
            }
        }


        if (test) {
            return (<Test close={this.close} />)
        }

        return (
            <div style={{ overflow: "hidden" }}>

                <div className={classes.headText}>
                    <Typography variant="h4" className={classes.title}>
                        {title}
                    </Typography>

                    <div style={{float: "right"}}>
                    <Tooltip title="Show Key" placement="top" className={classes.switch}>
                        <Switch
                            checked={showAnswer}
                            onChange={this.changeShow}
                            value="checkedA"
                            inputProps={{ 'aria-label': 'primary checkbox' }}

                        />
                    </Tooltip>

                    <Button variant="contained" color="primary" className={classes.editBtn} onClick={this.edit}>
                        Edit
                    </Button>

                    <Button variant="contained" color="primary" className={classes.editBtn} onClick={this.open}>
                        Test Me!
                    </Button>
                    </div>

                </div>
                <div className={classes.prevScore}>
                    {p != -1 ? <Typography variant="h5">You best score: {p*100}%</Typography> : ""}
                </div>
                <div>
                    {quiz.map((item, index) => {
                        return (<div className={classes.question} key={index}>
                            <div>
                                <Grid container spacing={2} className={classes.container}>
                                    <Grid item sm={5}>
                                        <Paper elevation={2} className={classes.box}>
                                            {item.question}
                                        </Paper>
                                    </Grid>
                                    <Grid item sm={5}>
                                        <div>
                                        {item.answers.map((ans, idx) => {
                                            var correct = idx == item.correct ? classes.correct : "";
                                            var c = showAnswer ? correct : "";

                                            return (<Paper elevation={2} className={classes.answer + " " + c} key={idx}>
                                                {ans}
                                            </Paper>)
                                        })}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>)
                    })}
                </div>

            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Quiz));