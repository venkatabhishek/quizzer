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
import { findUserProfile, updateUserProfile } from '../../utils/api-user';

import { withRouter } from "react-router";

const styles = theme => ({
    root: {
        padding: 40
    },
    paper: {
        padding: 40,
        textAlign: 'center',
        color: theme.palette.text.primary,
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
        width: 190,
        height: 50,
        background: "#623CE9",
        borderRadius: 200,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: 500,
        letterSpacing: "0.5px",
        marginRight: 30,
        border: "none",
        outline: "none"
    },
    primary: {
        fontSize: 24
    }
});



class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            open: false,
            message: "",
            password: ""
        };


    }

    componentWillMount = () => {
        const jwt = auth.isAuthenticated();

        findUserProfile(
            {
                userId: jwt.user._id
            },
            { t: jwt.token }
        ).then(data => {
            this.setState(data)
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        var params = {
            password: this.state.password,
            name: this.state.name,
            email: this.state.email
        }

        const jwt = auth.isAuthenticated();

        updateUserProfile(params, { t: jwt.token }).then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    open: true,
                    message: "Profile updated successfully"
                })

            }


        })



    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    render() {

        const { classes, user } = this.props;


        if (user.name) {
            user.name = user.name.replace(/\s/g, '');
        }

        return (
            <div className={classes.root}>


                <form autoComplete="off" className={classes.form} onSubmit={this.onSubmit}>
                    <Typography variant="h4" style={{ textAlign: "left", marginBottom: 25 }}>
                        User Information
                            </Typography>
                    <Typography variant="h6" style={{ textAlign: "left" }}>
                        Name
                            </Typography>
                    <input type="text"
                        placeholder="Name..."
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        className={classes.item + " " + classes.input} />
                    <br />
                    <Typography variant="h6" style={{ textAlign: "left" }}>
                        Email
                            </Typography>
                    <input type="email"
                        placeholder="Email..."
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        className={classes.item + " " + classes.input} />
                    <br />
                    <Typography variant="h6" style={{ textAlign: "left" }}>
                        Password
                            </Typography>
                    <input type="password"
                        autoComplete="new-password"
                        placeholder="Password..."
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        className={classes.item + " " + classes.input} />
                    <br />
                    <button type="submit" className={classes.submit}>
                        Update
                                    </button>

                </form>
                <br />
                {this.state.error && (
                    <Typography variant="subtitle1" gutterBottom className={classes.item} style={{ color: "red" }}>
                        {this.state.error}
                    </Typography>
                )}


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={() => { this.setState({ open: false }) }}
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
                            onClick={() => { this.setState({ open: false }) }}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Settings));