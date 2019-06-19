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

import { findActivity } from '../../../utils/api-activity'


import Test from './Quiz/Test';

const styles = theme => ({
    headText: {
        padding: 55
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
        marginLeft: 20
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
        marginBottom: 20
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
            showAnswer: false
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

                this.setState(data)

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

        const { quiz, title, test, showAnswer } = this.state;


        if (test) {
            return (<Test close={this.close} />)
        }

        return (
            <div style={{ overflow: "hidden" }}>

                <div className={classes.headText}>
                    <Typography variant="h4" className={classes.title}>
                        {title}
                    </Typography>

                    <Tooltip title="Show Key" placement="top" className={classes.switch}>
                    <Switch
                        checked={showAnswer}
                        onChange={this.changeShow}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}

                    />
                    </Tooltip>

                    <Button variant="contained" color="secondary" className={classes.editBtn} onClick={this.edit}>
                        Edit
                    </Button>

                    <Button variant="contained" color="secondary" className={classes.editBtn} onClick={this.open}>
                        Test Me!
                    </Button>

                </div>

                <div>
                    {quiz.map((item, index) => {
                        return (<div className={classes.question}>
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <Paper elevation={2} className={classes.box}>
                                            {item.question}
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {item.answers.map((ans, idx) => {
                                            var correct = idx == item.correct ? classes.correct : "";
                                            var c = showAnswer ? correct : "" ;

                                            return (<Paper elevation={2} className={classes.answer + " " + c}>
                                                {ans}
                                            </Paper>)
                                        })}
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