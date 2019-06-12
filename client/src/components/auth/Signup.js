
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { registerUser } from '../../utils/api-user.js';
import { Redirect } from 'react-router-dom';
import auth from './auth-helper';

import logo from '../../assets/logo.png'
import signup from '../../assets/signup.svg'

const styles = theme => ({
    base: {
        flexGrow: 1,
    },
    item: {
        margin: "18px 0"
    },
    input: {
        outline: "none",
        border: "none",
        background: "rgb(238, 238, 238)",
        padding: "20px",
        borderRadius: 500,
        width: "100%",
        boxSizing: "border-box",
        [theme.breakpoints.down('sm')]: {
            width: "230px"
        }
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
    button: {
        background: "#623CE9",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 70,
        color: "white",
        fontWeight: 500,
        borderRadius: 3,
        fontSize: 24,
        border: "none",
        marginTop: 20,
        margin: "auto"
    },
    img: {
        height: 450,
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        margin: "auto",
        display: "block",
    },

    logo: {
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    column: {
        float: "left"
    },
    formholder: {
        width: "40%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    imgholder: {
        width: "60%",
        background: "#F1F0FE",
        height: "100vh",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    link: {
        textDecoration: "none",
        color: "black"
    },
    logoWrapper: {
        position: "fixed",
        top: 25,
        left: 35
    },
    formcontent: {
        maxWidth: 360,

    },
    smallLink: {
        color: "#1E90FF",
        fontSize: "16px",
        textDecoration: "none"
    },
    smallLinks: {
        display: "flex",
        justifyContent: "space-between",
        margin: "30px 0"
    }

});

class Signup extends Component {
    state = {
        name: '',
        password: '',
        email: '',
        redirectToReferrer: false,
        error: ''
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined
        };
        registerUser(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                auth.authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { from } = this.props.location.state || {
            from: {
                pathname: '/app'
            }
        };
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div className={classes.base}>

                <div className={classes.logoWrapper}>
                    <Link to="/" className={classes.link}>
                        <div className={classes.logo}>
                            <img src={logo} alt="" style={{ height: 40, margin: 20 }} />
                            <Typography variant="h5">
                                Quizzer
                            </Typography>
                        </div>
                    </Link>
                </div>


                <div className={classes.content}>
                    <div className={classes.formholder + " " + classes.column}>
                        <div className={classes.formcontent}>
                            <Typography variant="h6" gutterBottom className={classes.item} style={{ fontWeight: "normal", marginTop: 30 }}>
                                Sign up for a new account.
							</Typography>

                            <form onSubmit={this.clickSubmit}>
                                <input type="text"
                                    placeholder="Name..."
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    className={classes.item + " " + classes.input} />
                                <br />
                                <input type="email"
                                    placeholder="Email..."
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    className={classes.item + " " + classes.input} />
                                <br />
                                <input type="password"
                                    placeholder="Password..."
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    className={classes.item + " " + classes.input} />

                                <br />
                                <button type="submit" className={classes.button}>
                                    Submit
								</button>

                                {this.state.error && (
                                    <Typography variant="subtitle1" gutterBottom className={classes.item} style={{ color: "red" }}>
                                        {this.state.error}
                                    </Typography>
                                )}


                            </form>

                            <div className={classes.smallLinks}>
                                <Link to="/signin" className={classes.smallLink}>Login</Link>
                                <Link to="/" className={classes.smallLink}>Help</Link>
                            </div>
                        </div>
                    </div>
                    <div className={classes.imgholder + " " + classes.column}>
                        <img src={signup} alt="" className={classes.img} />
                    </div>

                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Signup);