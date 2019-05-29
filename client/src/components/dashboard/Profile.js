import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        padding: 40,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        margin: theme.spacing.unit * 5,
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 3}px`,
        margin: 0,
        width: "100%"
    },
    logo: {
        width: 200,
        height: 200
    },
    column: {
        padding: 40
    },
    name: {
        marginTop: 20
    },
    item: {
        margin: 25,
    },
    input: {
        outline: "none",
        border: "none",
        background: "rgb(238, 238, 238)",
        padding: "12px 20px 12px 20px",
        borderRadius: 500
    },
    form: {
        display: "table"
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



class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            password: '',
            email: '',
            error: ''
        };

        console.log(props.user)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };



    render() {

        const { classes, user } = this.props;

        if (user.name) {
            user.name = user.name.replace(/\s/g, '');
        }

        console.log(this.state.name)

        return (
            <div >
                <Grid container spacing={0} className={classes.grid}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper} elevation={4}>
                            <img src={`https://github.com/identicons/${user.name}.png`} className={classes.logo} />
                            <Typography variant="h4" className={classes.name}>
                                {user.name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} >
                        <Paper className={classes.paper} elevation={4}>

                            <form autoComplete="off" className={classes.form}>
                            <Typography variant="h4" style={{textAlign: "left"}}>
                                Profile
                            </Typography>
                                <input type="text"
                                    placeholder="Name..."
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    className={classes.item + " " + classes.input} />
                                <br/>
                                <input type="email"
                                    placeholder="Email..."
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    className={classes.item + " " + classes.input} />
                                <br/>
                                <input type="password"
                                    autoComplete="new-password"
                                    placeholder="Password..."
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    className={classes.item + " " + classes.input} />
                                <br/>
                                <button type="submit" className={classes.submit}>
                                    Update
                                    </button>

                            </form>
                            <br/>
                            {this.state.error && (
                                <Typography variant="subtitle1" gutterBottom className={classes.item} style={{ color: "red" }}>
                                    {this.state.error}
                                </Typography>
                            )}

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);