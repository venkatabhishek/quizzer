import React, { Component } from 'react';
import { getAllActivities } from '../../utils/api-activity';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    activity: {
        width: 200,
        minHeight: 100,
        margin: 20,
        padding: 40
    },
    container: {
        display: "flex"
    },
    button: {
        margin: 20
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
            return (<Paper elevation={4} key={index} className={classes.activity}>
                <Typography variant="h5">
                {act.title}
                </Typography>
                <Typography variant="subtitle1">
                {act.category} | {act.cards.length} terms
                </Typography>

                <Button variant="contained" color="secondary" className={classes.button} onClick={this.goTo(act._id, act.activityType)}>
                    Play
                </Button>
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