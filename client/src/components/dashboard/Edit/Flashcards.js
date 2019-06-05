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

import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import auth from '../../auth/auth-helper';
import { createFlashcards, findActivity, updateFlashcards } from '../../../utils/api-activity';

import { withRouter, Redirect } from "react-router";

const styles = theme => ({
    root: {
        overflow: "hidden",
        padding: 50,

    },
    side: {
        padding: "0px 100px 0px 100px",
        textAlign: "center"
    },
    sidecard: {
        border: "1px solid black",
        cursor: "pointer",
        width: 200,
        height: 100,
        padding: 20
    },
    sidecardhalf: {
        height: 50,
        width: 200,
        float: "left",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    sidetext: {
        padding: 20
    },
    card: {
        display: "inline-block",
        padding: 40,
        width: 400,
        height: 150,
        overflowY: "auto"
    },
    current: {
        border: "1px solid #2196f3"
    },
    toggleContainer: {
        margin: "0 auto"
    },
    actionButton: {
        margin: 5
    },
    actionButtons: {
        margin: "auto",
        marginBottom: 20,
        float: "right"
    },
    textField: {
        marginTop: 0,
        marginLeft: 20
    },
    button: {
        marginTop: 30
    },
    fab: {
        marginLeft: 200,
        marginTop: -25
    }
})

class Flashcards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            num: 1,
            cards: [{
                front: EditorState.createEmpty(),
                back: EditorState.createEmpty()
            }],
            current: 0,
            formats: [],
            title: "",
            category: "",
            exists: false,
            id: null,
            open: false,
            message: ""
        }

        this.toggleStyle.bind(this);
        this.deleteCard.bind(this);


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

                data.cards.map((card) => {

                    var frontCState = convertFromRaw(JSON.parse(card.front));
                    var backCState = convertFromRaw(JSON.parse(card.back));

                    card.front = EditorState.createWithContent(frontCState);
                    card.back = EditorState.createWithContent(backCState);

                    return card
                })


                this.setState({
                    title: data.title,
                    category: data.category,
                    cards: data.cards,
                    exists: true,
                    num: data.cards.length,
                    id: values.q
                })


            }).catch(err => {
                this.props.history.push('/app')
            })

        }
    }

    play = () => {
        this.props.history.push('/app/play?type=f&q='+this.state.id)
    }

    handleFormat = (event, newFormats) => {
        this.setState({
            formats: newFormats
        })
    };

    deleteCard = (index) => (e) => {
        var { cards, num } = this.state

        this.setState({
            current: 0
        }, () => {

            if(num != 1){

                    cards.splice(index, 1);
                    this.setState({
                        cards,
                        num: num-1,
                    })

            }else{
                this.setState({
                            message: "There must be at least one card!",
                            open: true
                        })
            }
        })


    }

    addCard = () => {
        var cards = this.state.cards;

        cards.push({
            front: EditorState.createEmpty(),
            back: EditorState.createEmpty()
        })

        this.setState({
            cards,
            num: this.state.num + 1,
        });
    }

    setCurrent = (key) => (e) => {
        this.setState({
            current: key
        })
    }

    onChange = (constructor, q) => (editorState) => {
        var { cards, current } = this.state;

        if (q == 0) {
            cards[current].front = editorState;
        } else if (q == 1) {
            cards[current].back = editorState;
        }

        this.setState({ cards })
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    changeCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    save = (e) => {


        var { cards, title, category, exists, id } = this.state;

        const jwt = auth.isAuthenticated();

        if (exists) {
            updateFlashcards({
                id,
                cards,
                category,
                title
            }, { t: jwt.token }).then((data) => {
                console.log(data)
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
            createFlashcards({
                cards,
                title,
                category
            }, { t: jwt.token }).then(res => {



                const jwt = auth.isAuthenticated();



                findActivity(res._id).then((data) => {

                    data.cards.map((card) => {

                        var frontCState = convertFromRaw(JSON.parse(card.front));
                        var backCState = convertFromRaw(JSON.parse(card.back));

                        card.front = EditorState.createWithContent(frontCState);
                        card.back = EditorState.createWithContent(backCState);

                        return card
                    })

                    this.setState({
                        title: data.title,
                        category: data.category,
                        cards: data.cards,
                        exists: true,
                        num: data.cards.length,
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

    handleKeyCommand(command, editorState) {

        var { cards, current } = this.state

        const frontState = RichUtils.handleKeyCommand(cards[current].front, command);
        const backState = RichUtils.handleKeyCommand(cards[current].back, command);


        if (frontState && backState) {

            cards[current].front = frontState;
            cards[current].back = backState;

            var formats = []

            frontState.getCurrentInlineStyle().map(function(s) {

                formats.push(s)
            })


            this.setState({
                cards,
                formats
            })


            return 'handled';
        }


        return 'not-handled';
    }

    toggleStyle = (style) => (e) => {

        e.preventDefault();

        var { cards, current } = this.state


        const frontState = RichUtils.toggleInlineStyle(cards[current].front, style)
        const backState = RichUtils.toggleInlineStyle(cards[current].back, style)


        cards[current].front = frontState;
        cards[current].back = backState;

        this.setState({ cards })

    }

    onBlur = (e) => {
        this.setState({
            formats: []
        })
    }

    handleClose = (event, reason) => {
        this.setState({
            open: false
        })
    }

    handleOpen = (e) => {
        this.setState({
            open: true
        })
    }

    render() {
        const { classes } = this.props;
        const { cards, current, exists, id } = this.state;

        const sides = cards.map((card, index) => (
            <div style={{marginBottom: 60}} key={index}>
            <div
                className={classes.sidecard + " " + (index == current ? classes.current : null)}
                onClick={this.setCurrent(index)}
                key={index}>

                <div className={classes.sidecardhalf}>
                    {index != current ? (
                        <div>
                            <Editor editorState={card.front} readOnly={true} />
                        </div>
                    ) : null}
                </div>

                <hr />

                <div className={classes.sidecardhalf}>
                    {index != current ? (
                        <div>
                            <Editor editorState={card.back} readOnly={true} />
                        </div>
                    ) : null}
                </div>


            </div>

            <Fab color="secondary" aria-label="Delete" className={classes.fab} onClick={this.deleteCard(index)}>
                    <DeleteIcon />
            </Fab>
            </div>
        ))

        const main = cards[current];

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
                        onChange={this.changeTitle.bind(this)}
                    />

                    <TextField
                        id="standard-with-placeholder"
                        label="Category"
                        placeholder="Misc..."
                        className={classes.textField}
                        margin="normal"
                        value={this.state.category}
                        onChange={this.changeCategory.bind(this)}
                    />

                    <div className={classes.actionButtons}>
                        <Button variant="contained" color="secondary" className={classes.actionButton} onClick={this.handleOpen}>Import</Button>
                        <Button variant="contained" color="secondary" className={classes.actionButton} onClick={this.save.bind(this)}>Save</Button>
                        <Button variant="contained" color="secondary" className={classes.actionButton} onClick={this.play}>Play</Button>
                    </div>
                </div>

                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <div className={classes.side}>
                            {sides}
                            <Button variant="contained" color="secondary" className={classes.button} onClick={this.addCard.bind(this)}>
                                Add card
                        </Button>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={8}>
                            <Grid item xs={7}>
                                <div>
                                    <Paper className={classes.card}>
                                        <Typography variant="h5" component="h3">
                                            <Editor
                                                editorState={this.state.cards[current].front}
                                                onChange={this.onChange(current, 0).bind(this)}
                                                handleKeyCommand={this.handleKeyCommand.bind(this)}
                                                onBlur={this.onBlur.bind(this)}
                                                placeholder="Front text..." />
                                        </Typography>

                                    </Paper>
                                    <Paper className={classes.card}>
                                        <Typography variant="h5" component="h3">
                                            <Editor
                                                editorState={this.state.cards[current].back}
                                                onChange={this.onChange(current, 1).bind(this)}
                                                handleKeyCommand={this.handleKeyCommand.bind(this)}
                                                onBlur={this.onBlur.bind(this)}
                                                placeholder="Back text..." />
                                        </Typography>

                                    </Paper>
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div className={classes.toggleContainer}>
                                        <ToggleButtonGroup value={this.state.formats} onChange={this.handleFormat.bind(this)}>
                                            <ToggleButton value="BOLD" onMouseDown={this.toggleStyle("BOLD")}>
                                                <FormatBoldIcon />
                                            </ToggleButton>
                                            <ToggleButton value="ITALIC" onMouseDown={this.toggleStyle("ITALIC")}>
                                                <FormatItalicIcon />
                                            </ToggleButton>
                                            <ToggleButton value="UNDERLINE" onMouseDown={this.toggleStyle("UNDERLINE")}>
                                                <FormatUnderlinedIcon />
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </div>
                            </Grid>


                        </Grid>
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

export default withRouter(withStyles(styles)(Flashcards));