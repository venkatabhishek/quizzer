import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import auth from './auth/auth-helper';
import { findUserProfile } from '../utils/api-user.js';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';

  
import Profile from './dashboard/Profile';
import Base from './dashboard/Base';
import Edit from './dashboard/Edit';

var routes = [
	{
		path: "",
		exact: true,
		component: Base
	},
	{
		path: "profile",
		exact: false,
		component: Profile
	},
	{
		path: "edit",
		exact: false,
		component: Edit
	}
]

const styles = theme => ({
	
});

class Dashboard extends Component {

	constructor({ match }) {
		super();
		this.state = {
			user: '',
			redirectToSignin: false
		};
		this.match = match;
	}
	init = () => {
		this.setState({ redirectToSignin: false })
		const jwt = auth.isAuthenticated();
		if(jwt){
			findUserProfile(
				{
					userId: jwt.user._id
				},
				{ t: jwt.token }
			).then(data => {
				if (data.error) {
					this.setState({ redirectToSignin: true });
				} else {
					this.setState({ user: data });
				}
			});
		}else{
			this.setState({ redirectToSignin: true });
		}
	};

	componentWillMount(){
		this.init();
	}

	
	render() {
		const { classes, match } = this.props;
		const { user } = this.state
		const redirectToSignin = this.state.redirectToSignin;
		if (redirectToSignin) {
			return <Redirect to="/signin" />;
		}


		const routesComponent = routes.map(({ path, component: Component, exact}, key) => (
			<Route exact path={`${match.url}/${path}`} 
			render={(props) => <Component {...props} user={user}/>}
			exact={exact}
			key={key} 
			/>
		));


		return (
			<div className={classes.main}>
				<Navbar navigate={this.navigate}/>
				<Switch>
					{routesComponent}
					
				</Switch>
			</div>
		);
	}
}

export default withStyles(styles)(Dashboard);