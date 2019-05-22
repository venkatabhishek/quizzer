
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { registerUser } from '../../utils/api-user.js';
import { Redirect } from 'react-router-dom';
import auth from './auth-helper';

const styles = theme => ({
	base: {
		flexGrow: 1,
		overflow: "hidden",
		textAlign: "center"
	},
	item: {
		margin: 25
	},
	input: {
		outline: "none",
		border: "none",
		background: "rgb(238, 238, 238)",
		padding: "12px 20px 12px 20px",
		borderRadius: 500
	},
	column: {
		marginTop: 100
	},
	submit: {
		outline: "none",
		border: "none",
		background: "#2196f3",
		padding: "12px 20px 12px 20px",
		borderRadius: 500,
		color: "white",
		margin: 25
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
				<Grid container spacing={24}>

					<Grid item xs={4}>
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

								<input type="email" 
								placeholder="Email..." 
								value={this.state.email} 
								onChange={this.handleChange('email')} 
								className={classes.item + " " + classes.input} />

                                <input type="password" 
								placeholder="Password..." 
								value={this.state.password} 
								onChange={this.handleChange('password')} 
								className={classes.item + " " + classes.input} />

								<br/>
								<button type="submit" className={classes.submit}>
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
					<Grid item xs={8}>
					</Grid>
				</Grid>

                

			</div>
		);
	}
}

export default withStyles(styles)(Signup);