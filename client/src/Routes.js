import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/app" component={Dashboard}/>
				<Route path="/signin" component={Signin} />
				<Route path="/signup" component={Signup} />
			</Switch>
		);
	}
}

export default Routes;