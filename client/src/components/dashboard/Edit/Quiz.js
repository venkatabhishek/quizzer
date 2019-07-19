import React, { Component } from 'react';
import queryString from 'query-string';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';

import auth from '../../auth/auth-helper';
import { findActivity, createQuiz, updateQuiz } from '../../../utils/api-activity';

import { withRouter } from "react-router";

const styles = theme => ({
    actionButton: {
        margin: 5
    },
    actionButtons: {
        margin: "auto",
        marginBottom: 20,
        float: "right",
        [theme.breakpoints.down('sm')]: {
            marginTop: 40
        }
    },
    textField: {
        marginTop: 0,
        marginLeft: 20
    },
    button: {
        marginTop: 30
    },
    root: {
        overflow: "hidden",
        padding: 50,

    },
    sidecard: {
        width: 200,
        height: 100,
        border: "1px solid black",
        textAlign: "center",
        verticalAlign: "middle",
        marginBottom: 60,
        cursor: "pointer"

    },
    content: {
        display: "grid",
    },
    answerContainer: {
        display: "flex",
        flexDirection: "column"
    },
    answer: {
        flexGrow: 1,
        margin: 5
    },
    answerWrapper: {
        margin: 20,
        display: "flex"
    },
    delete: {
        flexGrow: 0
    },
    fab: {
        marginLeft: 175,
        marginTop: -25
    },
    side: {
        textAlign: "center",
        padding: "0px 100px 0px 100px",
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    highlight: {
        border: "1px solid #1e90ff"
    }
})

class Quiz extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: "",
            category: "",
            quiz: [{
                question: "",
                answers: ["",""],
                correct: 0
            }],
            exists: "",
            id: "",
            open: false,
            current: 0,
        }
    }

    componentWillMount = () => {
        const values = queryString.parse(this.props.location.search);

        const jwt = auth.isAuthenticated();

        if (!values.q) {
            this.setState({
                exists: false
            })
        } else {

            findActivity(values.q).then((data) => {

                this.setState({
                    title: data.title,
                    category: data.category,
                    quiz: data.quiz,
                    exists: true,
                    id: values.q
                })


            }).catch(err => {
                this.props.history.push('/app')
            })

        }
    }

    save = (e) => {


        var { quiz, title, category, exists, id } = this.state;

        const jwt = auth.isAuthenticated();

        if (exists) {
            updateQuiz({
                id,
                quiz,
                category,
                title
            }, { t: jwt.token }).then((data) => {
                if(data.error){
                    this.setState({
                        message: data.error,
                        open: true
                    })
                }else{
                    this.setState({
                        message: "Updated successfully!",
                        open: true
                    })
                }

            }).catch(err => {
                 this.setState({
                        message: "Update failed!",
                        open: true
                    })
            })


        } else {
            createQuiz({
                quiz,
                title,
                category
            }, { t: jwt.token }).then(res => {



                const jwt = auth.isAuthenticated();

                findActivity(res._id).then((data) => {


                    this.setState({
                        title: data.title,
                        category: data.category,
                        quiz: data.quiz,
                        exists: true,
                        id: res._id
                    })

                    this.setState({
                        message: "Saved successfully!",
                        open: true
                    })


                }).catch(err => {
                    this.props.history.push('/app')
                })



            }).catch(err => {
                this.setState({
                        message: "Saved failed!",
                        open: true
                    })
            })
        }

    }

    handleChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    handleQuiz = (type, subindex) => (e) => {
        var { quiz, current } = this.state

        if(type == "q"){
            quiz[current].question = e.target.value
        }else{
            quiz[current].answers[subindex] = e.target.value
        }

        this.setState({
            quiz
        })
    }

    addAnswer = () => {
        var { quiz, current } = this.state;

        quiz[current].answers.push("");

        this.setState({ quiz })
    }

    deleteAnswer = (index) => (e) => {
        var { quiz, current } = this.state;

        quiz[current].answers.splice(index, 1);

        this.setState({ quiz })
    }

    addQuestion = () => {
        var { quiz } = this.state;

        quiz.push({
            question: "",
            answers: ["", ""]
        })

        this.setState({ quiz })
    }

    deleteQuestion = (index) => (e) => {
        var { quiz, current } = this.state;

        if(quiz.length != 1){
            if(index >= current){
                current--;
            }

            quiz.splice(index, 1);

            this.setState({ quiz, current })
        }
    }

    setCurrent = (key) => (e) => {
        this.setState({
            current: key
        })
    }

    setCorrect = (index) => (e) => {
        var { quiz, current } = this.state

        quiz[current].correct = index;

        this.setState({ quiz })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    play = () => {
        this.props.history.push('/app/play?type=q&q='+this.state.id)
    }

    render(){
        const { classes } = this.props;

        const { quiz, current } = this.state;

        const side = quiz.map((item, index) => {
            var highlight = current == index ? classes.highlight : ""
            return (<div key={index} className={classes.sidecard + " " + highlight} onClick={this.setCurrent(index)} >
                <Typography variant="h6" style={{lineHeight: "100px"}}>
                    {index + 1}
                </Typography>

                <Fab color="primary" aria-label="Delete" className={classes.fab} onClick={this.deleteQuestion(index)}>
                    <DeleteIcon />
                </Fab>
            </div>)
        })


        return (
            <div className={classes.root}>
               <div className={classes.actionBar}>

                    <TextField
                        id="standard-with-placeholder"
                        label="Title"
                        placeholder="Untitled..."
                        className={classes.textField}
                        margin="normal"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                    />

                    <TextField
                        id="standard-with-placeholder"
                        label="Category"
                        placeholder="Misc..."
                        className={classes.textField}
                        margin="normal"
                        value={this.state.category}
                        onChange={this.handleChange("category")}
                    />

                    <div className={classes.actionButtons}>
                        <Button variant="contained" color="primary" className={classes.actionButton} onClick={this.save}>Save</Button>
                        <Button variant="contained" color="primary" className={classes.actionButton} onClick={this.play}>Play</Button>
                    </div>
                </div>

                <Grid container spacing={8}>
                    <Grid item sm={4}>
                    <div className={classes.side}>
                        {side}

                        <Button variant="contained" color="primary" onClick={this.addQuestion}>
                                Add Question
                            </Button>
                    </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div className={classes.content}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Question"
                                multiline
                                rows="4"
                                value={quiz[current].question}
                                onChange={this.handleQuiz("q")}
                                className={classes.question}
                                margin="normal"
                                variant="outlined"
                            />
                            <div className={classes.answerContainer}>
                            {quiz[current].answers.map((ans, index) => {
                                return(<div className={classes.answerWrapper} key={index}>
                                <TextField
                                    label={`Answer ${index+1}`}
                                    value={ans}
                                    onChange={this.handleQuiz("a", index)}
                                    variant="outlined"
                                    className={classes.answer}
                                />
                                <IconButton edge="end" aria-label="Delete" className={classes.delete} onClick={this.deleteAnswer(index)}>
                                    <DeleteIcon />
                                </IconButton>

                                <Radio
                                    checked={quiz[current].correct == index}
                                    onChange={this.setCorrect(index)}
                                    value={index}
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                    color="primary"
                                />

                                </div>)
                            })}

                            <Button variant="contained" color="primary" onClick={this.addAnswer}>
                                Add Answer
                            </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Quiz));