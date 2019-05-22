import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
	title : {
		"color": "rgba(0, 0, 0, 0.9)"
	}, 
	main: {
		position: "fixed",
  		top: "45%",
  		left: "50%",
  		transform: "translate(-50%, -50%)",
		textAlign: "center",

	},
	links: {
		color: "rgba(0, 0, 0, 0.9)",
		float: "left"
	},
	linksContainer: {
		textAlign: "center",
		width: "100%"
	},
	link:{
		margin: 10
	}
});

class Home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.main}>
				<Typography variant="h3" gutterBottom className={classes.title}>
        			Quizzer
      			</Typography>
				  <div className={classes.linksContainer}>
					<Typography variant="h5" gutterBottom className={classes.links}>
					<Link className={classes.link} color="inherit" href={"/signup"}>
						Signup
					</Link>
					<Link className={classes.link} color="inherit" href={"/signin"}>
						Login
					</Link>
					</Typography>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Home);