import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import { withRouter } from "react-router";

const styles = (theme) => ({
    col: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 10px"
    },
    mainText: {

    },
    card: {
        background: "white",
        width: 220,
        minHeight: 220,
        padding: 20,
        margin: "80px 80px",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    choose: {
        width: 180,
        height: 50,
        background: "#623CE9",
        borderRadius: 4,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: 500,
        letterSpacing: "0.5px",
    },
})

class Create extends Component {

    navigate = (to) => (e) => {
        this.props.history.push(`/app/${to}`)
    }

    render() {
        const { classes } = this.props

        return (<div className={classes.col}>
            <Typography variant="h4" className={classes.mainText}>
                Choose a Type
            </Typography>
            <div style={{ display: "flex", flexWrap:  "wrap" }}>
                <div className={classes.card}>
                    <Typography variant="h4">
                        Quiz
            </Typography>
                    <Typography variant="h6" >
                        A multiple choice, dynamic quiz, ideal for practicing the real thing
            </Typography>
                    <div className={classes.choose} onClick={this.navigate("edit?type=q")}>
                        Choose
                            </div>
                </div>
                <div className={classes.card}>
                    <Typography variant="h4">
                        Flashcards
            </Typography>
                    <Typography variant="h6" >
                        Two-sided key to definition cards, perfect for vocabulary, etc...
            </Typography>
            <div className={classes.choose} onClick={this.navigate("edit?type=f")}>
                        Choose
                            </div>
                </div>
            </div>
        </div>)
    }
}


export default withRouter(withStyles(styles)(Create));