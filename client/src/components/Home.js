import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import logo from '../assets/logo.png'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import study from '../assets/study.svg'
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'
import FilterNone from '@material-ui/icons/FilterNone'
import Group from '@material-ui/icons/Group';
import Search from '@material-ui/icons/Search';
import Favorite from '@material-ui/icons/Favorite';
import Share from '@material-ui/icons/Share';

import { Link } from 'react-router-dom'


const styles = theme => ({
	main: {

	},
    header: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 70,
        paddingRight: 70,
        minHeight: 160,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 30,
            paddingRight: 30
        },
    },
    logo: {
        display: "flex",
        alignItems: "center"

    },
    navbar: {
        justifyContent: "flex-end",
        display: "flex",
        width: "100%"
    },
    logoImg: {
        height: 70
    },
    logoText:{
        fontSize: 40,
        margin: 20
    },
    button: {
        background: "#623CE9",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 70,
        color: "white",
        fontWeight: 500,
        borderRadius: 3,
        fontSize: 24
    },
    large: {
        [theme.breakpoints.down('xs')]: {
            display: "none"
        },
    },
    mobile: {
        display: "none",
        [theme.breakpoints.down('xs')]: {
            display: "flex !important"
        },
    },
    wrapperGrid: {
        width: "80%",
        margin: "auto"
    },
    img: {
        width: "100%"
    },
    container: {
        padding: "30px 0px 0px 70px",
        [theme.breakpoints.down('xs')]: {
            padding: 0
        },
        margin: "auto"
    },
    introTitle: {
        marginBottom: 30,
        lineHeight: "65px"
    },
    introText: {
        lineHeight: "35px",
        marginBottom: 30,
    },
    features: {
        background: "#f9f9fc"
    },
    section: {
        padding: "100px 0"
    },
    featuresTitle: {
        fontWeight: "normal",
        padding: 10,
        paddingBottom: 40
    },
    intro: {
        paddingTop: 50,
        paddingBottom: 100
    },
    square: {
        background: "white",
        width: 140,
        height: 140,
        margin: 20,
        marginTop: 0,
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    featuresSquares: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    icon: {
        display: "block",
        margin: "auto",
        width: 60,
        height: 60
    },
    squareWrapper: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "row"
        },
    },
    squareLabel: {
        margin: "20px 0",
        textAlign: "center",
    },
    contactForm: {
        padding: 40,
        margin: "auto"
    },
    textField: {
        width: "100%",
        margin: "30px 0"
    },
    footer: {
        background: "black",
        color: "white",
        padding: "25px 0"
    },
    mobileTop: {
        marginTop: 60
    },
    link: {
        textDecoration: "none"
    }


});

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            message: ""
        }
    }

    onChange = (type) => (e) => {
        this.setState({
            [type]: e.target.value
        })
    }

    render() {
		const { classes } = this.props;
		return (
			<div style={{overflow: "hidden"}}>
				<header className={classes.header}>
                    <div className={classes.logo}>
                        <img src={logo} className={classes.logoImg}/>
                        <Typography className={classes.logoText} >
                        Quizzer
                        </Typography>
                    </div>
                    <div className={classes.navbar}>
                        <Link to="/signin" className={classes.link + " " + classes.large} style={{color: "white"}}>
                                        <div className={classes.button}>
                                           Login
                                        </div>
                                    </Link>
                    </div>
                </header>
                <main className={classes.main}>
                    <section className={classes.intro}>
                        <Grid container spacing={0} className={classes.wrapperGrid}>
                            <Grid item sm={6}>
                                <img src={study} alt="" className={classes.img}/>
                            </Grid>
                            <Grid item sm={6}>
                                <Container className={classes.container}>
                                    <Typography variant="h3" className={classes.introTitle}>
                                        Welcome to the next level of learning.
                                    </Typography>
                                    <Typography variant="h5" className={classes.introText}>
                                        Quizzer is an all-in-one learning tool designed to accelerate your progress by providing a variety of tools in a convenient platform
                                    </Typography>
                                     <Link to="/signup" className={classes.link} style={{color: "white"}}>
                                        <div className={classes.button}>
                                           Get Started
                                        </div>
                                    </Link>

                                </Container>
                            </Grid>
                        </Grid>
                    </section>
                    <section className={classes.features + " " + classes.section}>
                        <Grid container className={classes.wrapperGrid}>
                            <Grid item sm={4}>
                                <Typography variant="h5" className={classes.featuresTitle}>
                                    Quizzer has tons of wonderful features ready to go:
                                </Typography>
                            </Grid>
                            <Grid item sm={8}>
                                <div className={classes.featuresSquares}>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <FilterNone className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Flashcards
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <ChromeReaderMode className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Quizzes
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <Group className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Groups
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <Search className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Advanced <br /> Searching
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <Favorite className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Personalized <br /> Favorites
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <Share className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Sharing +
                                            <br />Social Media
                                        </Typography>
                                    </div>

                                </div>
                            </Grid>
                        </Grid>
                    </section>
                    <section className={classes.contact + " " + classes.section}>
                        <Grid container spacing={0} className={classes.wrapperGrid}>
                            <Grid item sm={6}>
                                <Paper className={classes.contactForm} elevation={12}>
                                <Container>
                                    <form noValidate autoComplete="off">
                                        <TextField
                                            id="standard-name"
                                            label="Email"
                                            placeholder="Enter your email address..."
                                            className={classes.textField}
                                            value={this.state.email}
                                            onChange={this.onChange("email")}
                                            type="email"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-multiline-static"
                                            label="Message"
                                            placeholder="Enter your message/concern..."
                                            multiline
                                            rows="4"
                                            value={this.state.message}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.onChange("message")}
                                            margin="normal"
                                        />

                                        <div className={classes.button} style={{margin: "auto"}}>Send</div>
                                        </form>
                                        </Container>
                                </Paper>
                            </Grid>
                            <Grid item sm={6}>
                                <Container className={classes.container + " " + classes.mobileTop}>
                                    <Typography variant="h4">
                                        Leave us a note.
                                    </Typography>
                                    <Typography variant="h6" style={{fontWeight: "normal", marginTop: 10}}>
                                        Have a quesiton or concern? Drop us a message and we'll get back to you ASAP
                                    </Typography>
                                </Container>
                            </Grid>
                        </Grid>
                    </section>
                    <footer className={classes.footer}>
                        <Grid container spacing={8} className={classes.wrapperGrid}>
                            <Grid item sm={4}>
                            <Typography style={{margin: "40px 0", fontSize: "40px"}} >
                        Quizzer
                        </Typography>
                            </Grid>
                            <Grid item sm={8} style={{margin: "auto"}}>
                                <Typography variant="h4" style={{float: "right"}}>
                                    Made by <a href="https://venkatabhishek.github.io" style={{color: "white"}}>Abhishek Venkat</a>
                                </Typography>
                            </Grid>

                        </Grid>
                    </footer>
                </main>
			</div>
		);
	}
}

export default withStyles(styles)(Home);