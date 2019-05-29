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
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

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
        marginBottom: 40,
        cursor: "pointer",
        width: 200,
        height: 100,
        padding: 20
    },
    sidecardhalf: {
        height: 50,
        width: 200,
        float: "left"
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
            formats: []
        }

        this.toggleStyle.bind(this);

    }

    handleFormat = (event, newFormats) => {
        this.setState({
            formats: newFormats
        })
    };

    addCard = () => {
        var cards = this.state.cards;

        cards.push({
            front: EditorState.createEmpty(),
            back: EditorState.createEmpty()
        })

        this.setState({
            cards,
            num: this.state.num + 1,
            current: cards.length - 1
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

    render() {
        const { classes } = this.props;
        const { cards, current } = this.state;


        const sides = cards.map((card, index) => (
            <div
                className={classes.sidecard + " " + (index == current ? classes.current : null)}
                onClick={this.setCurrent(index)}
                key={index}>
                <div className={classes.sidecardhalf}>
                    {index != current ? (
                        <div>
                            <Editor editorState={card.front} />
                        </div>
                    ) : null}
                </div>
                <hr />
                <div className={classes.sidecardhalf}>
                    {index != current ? (
                        <div>
                            <Editor editorState={card.back} />
                        </div>
                    ) : null}
                </div>
            </div>
        ))

        const main = cards[current];

        return (
            <div className={classes.root}>
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
                                                editorState={cards[current].front}
                                                onChange={this.onChange(current, 0)}
                                                handleKeyCommand={this.handleKeyCommand.bind(this)}
                                                onBlur={this.onBlur.bind(this)}
                                                placeholder="Front text..." />
                                        </Typography>

                                    </Paper>
                                    <Paper className={classes.card}>
                                        <Typography variant="h5" component="h3">
                                            <Editor
                                                editorState={cards[current].back}
                                                onChange={this.onChange(current, 1)}
                                                handleKeyCommand={this.handleKeyCommand.bind(this)}
                                                onBlur={this.onBlur.bind(this)}
                                                placeholder="Back text..." />
                                        </Typography>

                                    </Paper>
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ margin: "auto", marginBottom: 20 }}>
                                        <Button variant="contained" color="secondary" className={classes.actionButton}>Import</Button>
                                        <Button variant="contained" color="secondary" className={classes.actionButton}>Save</Button>
                                    </div>
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
            </div>
        )
    }
}

export default withStyles(styles)(Flashcards);