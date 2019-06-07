import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import logo from '../assets/logo.png'

const styles = theme => ({
	main: {


	},
    header: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 70,
        paddingRight: 70,
        minHeight: 160
    },
    logo: {
        display: "flex",

    },
    navbar: {
        justifyContent: "flex-end",
        display: "flex",
        width: "100%"
    },
    logoImg: {
        height: 70
    }

});

class Home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.main}>
				<div className={classes.header}>
                    <div className={classes.logo}>
                        <img src={logo} className={classes.logoImg}/>
                        <Typography variant="h2">
                        Quizzer
                        </Typography>
                    </div>
                    <div className={classes.navbar}>
                        <Button variant="contained" style={{background: "#6C63FE", color: "white"}}>SIGN IN</Button>
                    </div>
                </div>
			</div>
		);
	}
}

export default withStyles(styles)(Home);