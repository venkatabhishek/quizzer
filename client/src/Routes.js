import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Signin from './components/auth/Signin';

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/signin" component={Signin} />
			</Switch>
		);
	}
}

export default Routes;