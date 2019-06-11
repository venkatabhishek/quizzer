
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
		margin: "25px 0"
	},
	input: {
		outline: "none",
		border: "none",
		background: "rgb(238, 238, 238)",
		padding: "20px",
		borderRadius: 500,
        width: "100%",
        boxSizing: "border-box"
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
        height: 500
    },
    grid: {
        width: "70%",
        margin: "auto"
    },
    header: {
        height: 80,
        boxShadow: "0px 1px 1px #d0d4d9",
        padding: "5px 0"
    },
    logo: {
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    formColumn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    column: {
        width: "100%"
    },
    link: {
        textDecoration: "none",
        color: "black"
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

                <div className={classes.header}>
                    <Link to="/" className={classes.link}>
                        <div className={classes.logo}>
                            <img src={logo} alt="" style={{height: 50, margin: 20}} />
                            <Typography variant="h4">
                            Quizzer
                            </Typography>
                        </div>
                    </Link>
                </div>

				<Grid container spacing={5} className={classes.grid} >

					<Grid item xs={5} className={classes.formColumn}>
						<div className={classes.column}>
							<Typography variant="h4" gutterBottom className={classes.item}>
								Register
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

								<br/>
								<button type="submit" className={classes.button}>
									Submit
								</button>

								{this.state.error && (
									<Typography variant="subtitle1" gutterBottom className={classes.item} style={{color: "red"}}>
										{this.state.error}
									</Typography>
								)}


							</form>

						</div>
					</Grid>

					<Grid item xs={7} style={{padding: 60}}>
                        <img src={signup} alt="" className={classes.img}/>
					</Grid>
				</Grid>



			</div>
		);
	}
}

export default withStyles(styles)(Signup);