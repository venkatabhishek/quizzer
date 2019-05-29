import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import auth from './auth-helper';
import { Redirect } from 'react-router-dom';
import { signin } from '../../utils/api-auth.js';

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
		margin: 25,
		cursor: "pointer"
	}
});

class Signin extends Component {
	state = {
		email: '',
		password: '',
		error: '',
		redirectToReferrer: false
	};

	clickSubmit = (e) => {
		e.preventDefault();

		const user = {
			email: this.state.email || undefined,
			password: this.state.password || undefined
		};

		signin(user).then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				auth.authenticate(data, () => {
					this.setState({ redirectToReferrer: true });
				});
			}
		});
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
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
								Sign in
							</Typography>

							<form onSubmit={this.clickSubmit}>
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

export default withStyles(styles)(Signin);