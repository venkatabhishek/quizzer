import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import auth from '../auth/auth-helper';
import { getActivities, deleteActivity } from '../../utils/api-activity';

import { withRouter } from "react-router";

const styles = theme => ({
    paper: {
        padding: 40,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        margin: theme.spacing(5),
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
        margin: 0,
        width: "100%"
    },
    logo: {
        width: 200,
        height: 200
    },
    column: {
        padding: 40
    },
    name: {
        marginTop: 20
    },
    item: {
        margin: 25,
    },
    input: {
        outline: "none",
        border: "none",
        background: "rgb(238, 238, 238)",
        padding: "12px 20px 12px 20px",
        borderRadius: 500
    },
    form: {
        display: "table"
    },
    submit: {
		outline: "none",
		border: "none",
		background: "#2196f3",
		padding: "12px 20px 12px 20px",
		borderRadius: 500,
		color: "white",
		margin: 25
	},
    primary: {
        fontSize: 24
    }
});



class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            password: '',
            email: '',
            error: '',
            activities: [],
            open: false,
            message: ""
        };


    }

    componentWillMount = () => {
		const jwt = auth.isAuthenticated();
		getActivities({t: jwt.token}).then((data) => {
            this.setState({
                activities: data
            })
        }).catch(err => {
            console.log(err)
        })
    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    delete = (id) => (e) => {
        const jwt = auth.isAuthenticated();
        deleteActivity(id, {t: jwt.token}).then(() => {
            var activities = this.state.activities;

            activities = activities.filter(function( obj ) {
                return obj._id !== id;
            });

            this.setState({ activities, open: true, message: "Deleted Successfully" })
        }).catch(err => {
            console.log(err)
        })
    }

    goTo = (id, type) => (e) => {

        var path = '/app/play?q='+id;

        if(type == "Flashcards"){
            path+='&type=f'
        }else{
            path+='&type=q'
        }

        this.props.history.push(path);
    }


    render() {

        const { classes, user } = this.props;


        if (user.name) {
            user.name = user.name.replace(/\s/g, '');
        }


        const activities = this.state.activities.map((item, index) => {

            return (
                <div className={classes.demo} key={index}>

                <ListItem button onClick={this.goTo(item._id)}>

                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                  classes={{
                        primary: classes.primary
                    }}
                    primary={item.title}
                    secondary={item.category + " | " + (item.activityType == "Flashcards" ? (item.cards.length + " terms") : (item.quiz.length + " questions"))}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete" onClick={this.delete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>

                </ListItem>
          </div>
        )
        })

        return (
            <div >
                <Grid container spacing={0} className={classes.grid}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper} elevation={4}>
                            <img src={`https://github.com/identicons/${user.name}.png`} className={classes.logo} />
                            <Typography variant="h4" className={classes.name}>
                                {user.name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} >
                        <Paper className={classes.paper} elevation={4}>

                            <form autoComplete="off" className={classes.form}>
                            <Typography variant="h4" style={{textAlign: "left"}}>
                                Profile
                            </Typography>
                                <input type="text"
                                    placeholder="Name..."
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    className={classes.item + " " + classes.input} />
                                <br/>
                                <input type="email"
                                    placeholder="Email..."
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    className={classes.item + " " + classes.input} />
                                <br/>
                                <input type="password"
                                    autoComplete="new-password"
                                    placeholder="Password..."
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    className={classes.item + " " + classes.input} />
                                <br/>
                                <button type="submit" className={classes.submit}>
                                    Update
                                    </button>

                            </form>
                            <br/>
                            {this.state.error && (
                                <Typography variant="subtitle1" gutterBottom className={classes.item} style={{ color: "red" }}>
                                    {this.state.error}
                                </Typography>
                            )}

                        </Paper>

                        <Paper className={classes.paper} elevation={4}>
                            <Typography variant="h4" style={{textAlign: "left"}}>
                                Your Activities
                            </Typography>
                            <List dense={true}>
                            {activities}
                            </List>
                        </Paper>


                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={() => {this.setState({open: false})}}
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
                        onClick={() => {this.setState({open: false})}}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Profile));