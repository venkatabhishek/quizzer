import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const theme = createMuiTheme({
	palette: {
		primary: blue
	},
	typography: {
		useNextVariants: true,
	  }
});

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<Routes />
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;