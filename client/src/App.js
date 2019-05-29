import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
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
				<ThemeProvider theme={theme}>
					<Routes />
				</ThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;