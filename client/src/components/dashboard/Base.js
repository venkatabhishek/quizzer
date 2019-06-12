import React, { Component } from 'react';
import { getAllActivities } from '../../utils/api-activity';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Empty from '../../assets/empty.svg';

const styles = theme => ({
    activity: {
        width: 200,
        minHeight: 150,
        margin: 20,
        padding: 40,
        cursor: "pointer",
        "&:hover": {
            outline: "2px solid #1e90ff"
        },
        position: "relative"
    },
    container: {
        display: "flex"
    },
    button: {
        margin: 20
    },
    authorImg: {
        borderRadius: 500,
        width: 40,
        display: "inline",
        verticalAlign: "middle",
        marginRight: 20
    },
    author: {
        display: "inline",
        verticalAlign: "middle"
    },
    byline: {
        verticalAlign: "bottom",
        position: "absolute",
        bottom: 0,
        marginBottom: 30
    },
    authorContainer: {
        marginBottom: 20
    },
    nocontent: {
        textAlign: "center",
        marginTop: 40
    },
    nocontentImg: {
        height: "60vh",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        margin: "auto",
    }
})

class Base extends Component {

    constructor(props){
        super(props);

        this.state = {
            activities: []
        }
    }

    componentWillMount = () => {
        getAllActivities().then((activities) => {
            this.setState({
                activities
            })
        }).catch(err => {
            console.log(err)
        })
    }

    goTo = (id, type) => (e) => {

        var path = '/app/play?q='+id;

        if(type == "Flashcards"){
            path+="&type=f"
        }else{
            path+="&type=q"
        }

        this.props.history.push(path)

    }

    render(){
        const { classes } = this.props;
        const { activities } = this.state



        const list = activities.map((act, index) => {
            return (<Paper elevation={4} key={index} className={classes.activity} onClick={this.goTo(act._id, act.activityType)}>
                <Typography variant="h5">
                {act.title}
                </Typography>
                <Typography variant="subtitle1">
                {act.category} | {act.activityType == "Flashcards" ? (<span>{act.cards.length} terms</span>) : (<span>{act.quiz.length} questions</span>)}
                </Typography>

                <div className={classes.byline}>
                    <div className={classes.authorContainer}>
                        <img src={`https://github.com/identicons/${act.author.name}.png`} className={classes.authorImg} />
                        <Typography variant="subtitle1" className={classes.author}>
                            {act.author.name}
                        </Typography>
                    </div>
                    <div className={classes.date}>
                        {(new Date(act.createDate)).toDateString()}
                    </div>

                </div>

            </Paper>)
        })

        return(
            <div className={classes.container}>
                {list}
            </div>
        );
    }
}

export default withStyles(styles)(Base);