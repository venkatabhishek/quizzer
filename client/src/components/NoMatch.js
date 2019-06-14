import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'


import { Link } from 'react-router-dom'


const styles = theme => ({


});

class NoMatch extends Component {



    onChange = (type) => (e) => {
        this.setState({
            [type]: e.target.value
        })
    }

    render() {
		const { classes } = this.props;
		return (
			<div style={{overflow: "hidden"}}>
				404 WRONG PATH :)
			</div>
		);
	}
}

export default withStyles(styles)(NoMatch);