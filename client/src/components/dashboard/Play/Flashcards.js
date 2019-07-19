import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom'
import { convertFromRaw, EditorState, Editor } from 'draft-js'
import { findActivity } from '../../../utils/api-activity'

import Test from './Quiz/Test';

const styles = theme => ({
    Card: {
        maxWidth: 600,
        maxHeight: 400,
        margin: "auto",


    },
    flipCard:{
        perspective: "1000px",
        backgroundColor: "transparent",
        width: 450,
        height: 225,
        margin: "auto",
        marginBottom: 80,
        [theme.breakpoints.down('sm')]: {
            width: 300
        }

    },
    under: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "30%",
        margin: "auto",
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            width: "55%"
        }
    },
    flipCardInner: {
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        transition: "0.6s",
        boxShadow: "0 0.3125rem 1.25rem 0 rgba(0,0,0,0.24)",

    },
    flip: {
        transform: "rotateX(-180deg)"
    },
    flipCardFront: {
        backfaceVisibility: "hidden",
        transform: "rotateX(0deg)",
        position: "absolute"
    },
    flipCardBack: {
        backfaceVisibility: "hidden",
        transform: "rotateX(180deg)",
        position: "absolute",
        bottom: 30
    },
    headText: {
        padding: 55
    },
    title: {
        margin: 40
    },
    category: {
        margin: 40
    },
    list: {
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('sm')]:{
            display: "none"
        }
    },
    mobileList: {
        display: "none",
        background: "#f5f5f5",
        [theme.breakpoints.down('sm')]:{
            display: "flex",
            flexDirection: "column",
        }
    },
    row: {
        display: "flex",
        justifyContent: "center"
    },
    title: {
        display: "inline-block"
    },
    minCard: {
        background: "white",
        width: "25%",
        minHeight: 100,
        margin: 40,
        padding: 40
    },
    mobileMinCard: {
        background: "white",
        width: "100%",
        minHeight: 100,
        margin: 40,
        padding: 40
    },
    editBtn: {
        float: "right",
    }
})

class Flashcards extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: "",
            category: "",
            cards: [],
            current: 1,
            exists: true,
            flipped: false
        }

    }

    componentWillMount(){
        const values = queryString.parse(this.props.location.search);

        if(values.q){

            findActivity(values.q).then((data) => {

                data.cards.map((card) => {

                    var frontCState = convertFromRaw(JSON.parse(card.front));
                    var backCState = convertFromRaw(JSON.parse(card.back));

                    card.front = EditorState.createWithContent(frontCState);
                    card.back = EditorState.createWithContent(backCState);

                    return card
                })

                this.setState(data)

            }).catch(err => {
                console.log(err)
            })
        }else{
            this.setState({
                exists: false
            })
        }
    }

    change = (dir) => (e) => {
        var { cards, current } = this.state;

        if(dir == -1){
            if(current == 1){
                dir = 0;
            }
        }else if(dir == 1){
            if(current == cards.length){
                dir = 0
            }
        }

        this.setState({
            current: current+dir
        })
    }

    toggleFlip = () => {
        this.setState({
            flipped: !this.state.flipped
        })
    }

    edit = () => {
        this.props.history.push('/app/edit?type=f&q='+this.state._id)
    }

    render() {

        const { classes } = this.props;
        const { exists, cards, current, flipped, title, category } = this.state;

        if(!exists || cards.length == 0){
            return (<div>ERROR DNE</div>)
        }

        var flipClass = ""

        if(flipped){
            flipClass = classes.flip;
        }

        return (
            <div>
                <div className={classes.headText}>
                    <Typography variant="h4" className={classes.title}>
                        {title}
                    </Typography>


                    <Button variant="contained" color="primary" className={classes.editBtn} onClick={this.edit}>
                        Edit
                    </Button>

                </div>

                <div className={classes.Card}>
                    <div className={classes.flipCard}>
                    <div className={classes.flipCardInner + " " + flipClass} onClick={this.toggleFlip}>
                        <div className={classes.flipCardFront}>
                            <Editor readonly={true} editorState={cards[current-1].front} />
                        </div>
                        <div className={classes.flipCardBack}>
                            <Editor readonly={true} editorState={cards[current-1].back} />
                        </div>
                    </div>
                    </div>
                    <div className={classes.under}>
                        <IconButton color="primary" className={classes.button} onClick={this.change(-1)}>
                            <ArrowBack/>
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            {current} / {cards.length}
                        </Typography>
                        <IconButton color="primary" className={classes.button} onClick={this.change(1)}>
                            <ArrowForward />
                        </IconButton>
                    </div>

                </div>

                <div className={classes.list}>
                    {cards.map((card, index) => {
                        return (<div key={index} className={classes.row}>

                                <div className={classes.minCard}>
                                    <Editor readonly={true} editorState={card.front}/>
                                </div>

                                <div className={classes.minCard}>
                                    <Editor readonly={true} editorState={card.back}/>
                                </div>

                        </div>)
                    })}
                </div>

                <div className={classes.mobileList}>
                    {cards.map((card, index) => {
                        return (<div key={index} className={classes.row}>

                                <div className={classes.mobileMinCard}>
                                    <Editor readonly={true} editorState={card.front}/>
                                    <br />
                                    <Editor readonly={true} editorState={card.back}/>
                                </div>


                        </div>)
                    })}
                </div>


            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Flashcards));