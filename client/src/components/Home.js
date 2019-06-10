import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
        [theme.breakpoints.down('xs')]: {
            display: "none"
        },
        fontWeight: 500,
        borderRadius: 3,
        fontSize: 24
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
        [theme.breakpoints.down('sm')]: {
            lineHeight: "130px"
        },
    },
    contactForm: {
        padding: 40,
        margin: "auto"
    },
    textField: {
        width: "100%",
        margin: "30px 0"
    }

});

class Home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<header className={classes.header}>
                    <div className={classes.logo}>
                        <img src={logo} className={classes.logoImg}/>
                        <Typography className={classes.logoText} >
                        Quizzer
                        </Typography>
                    </div>
                    <div className={classes.navbar}>
                        <div className={classes.button}>Log In</div>
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
                                    <div className={classes.button+" "+ classes.mobile}>Log In</div>

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
                                            Searching
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <Favorite className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Favorites
                                        </Typography>
                                    </div>
                                    <div className={classes.squareWrapper}>
                                        <div className={classes.square}>
                                            <Share className={classes.icon}/>
                                        </div>
                                        <Typography className={classes.squareLabel}>
                                            Sharing
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
                                            label="Name"
                                            className={classes.textField}
                                            value={"asdasd"}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-multiline-static"
                                            label="Multiline"
                                            multiline
                                            rows="4"
                                            defaultValue="Default Value"
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        </form>
                                        </Container>
                                </Paper>
                            </Grid>
                            <Grid item sm={6}>
                                <Container className={classes.container}>
                                    <Typography variant="h4">
                                        Leave us a note
                                    </Typography>
                                </Container>
                            </Grid>
                        </Grid>
                    </section>
                </main>
			</div>
		);
	}
}

export default withStyles(styles)(Home);