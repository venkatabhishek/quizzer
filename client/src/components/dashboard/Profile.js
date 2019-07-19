import React, { Component } from 'react';
import { getActivities, getLikedActivities } from '../../utils/api-activity';
import auth from '../auth/auth-helper';
import { findUserProfile } from '../../utils/api-user.js';

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MoreVert from '@material-ui/icons/MoreVert'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Empty from '../../assets/empty.svg';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'


const styles = theme => ({
    container: {
        padding: "20px 0px 0px 40px"
    },
    activity: {
        width: 220,
        minHeight: 220,
        margin: 20,
        boxShadow: "0px 15px 38px rgba(0, 0, 0, 0.15)",
        borderRadius: 24,
        padding: 20,
        cursor: "pointer",
        "&:hover": {
            background: "#f5f5f5"
        },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    button: {
        margin: 20
    },
    bottom: {

        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "Profileline",
        marginBottom: 20
    },
    weight: {
        fontWeight: "normal"
    },
    helper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
        padding: "30px 0"
    },
    big: {
        width: 300,
        height: 150,
        margin: 20,
        padding: 20
    },
    bigBtn: {
        margin: "20px 40px 20px 20px"
    },
    helpBtn: {
        margin: 20,
        padding: "5px 20px"
    },
    helpTxt: {
        margin: 25
    },
    img: {
        [theme.breakpoints.down('sm')]: {
            display: "none  "
        }
    },
    back: {
        width: "50%",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        }
    }
})

class Profile extends Component {

    constructor(props) {
        super(props);


        this.state = {
            activities: [],
            anchor: [],
            liked: [],
            likes: [],
            detailsOpen: false,
            details: {}
        }

    }

    componentWillMount = () => {

        const jwt = auth.isAuthenticated();

        getActivities({ t: jwt.token }).then((activities) => {

            getLikedActivities({ t: jwt.token }).then(liked => {
                this.setState({
                    activities,
                    liked
                })
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }

    handleMenuOpen = index => event => {
        event.stopPropagation();
        var { anchor } = this.state;



        anchor[index] = event.currentTarget;
        this.setState({ anchor });
    };

    handleMenuClose = index => event => {
        if (event) {
            event.stopPropagation();
        }
        var { anchor } = this.state;

        anchor[index] = null;
        this.setState({ anchor });
    };

    handleOpen = (index) => (e) => {
        e.stopPropagation();

        this.handleMenuClose(index)(null);
    }



    goToPlay = (id, type) => (e) => {


        var path = '/app/play?q=' + id;

        if (type == "Flashcards") {
            path += "&type=f"
        } else {
            path += "&type=q"
        }

        this.props.history.push(path)

    }

    goToEdit = (id, type) => (e) => {

        e.stopPropagation();

        var path = '/app/edit?q=' + id;

        if (type == "Flashcards") {
            path += "&type=f"
        } else {
            path += "&type=q"
        }

        this.props.history.push(path)

    }

    handleClose = () => {
        this.setState({
            detailsOpen: false
        })
    }

    helpLoc = () => {
        this.props.history.push('/app/edit?type=f')
    }

    handleDetailsOpen = (index) => (e) => {

        e.stopPropagation();

        var { activities } = this.state;

        console.log(activities[index])

        this.setState({
            detailsOpen: true,
            details: activities[index]
        })
    }

    render() {
        const { classes, user } = this.props;
        const { activities, anchor, liked, detailsOpen, details } = this.state;

        const isOpen = anchor.map(an => {
            return Boolean(an);
        })

        const list = activities.map((act, index) => {
            return (<Paper elevation={4} key={index} className={classes.activity} onClick={this.goToPlay(act._id, act.activityType)}>
                <div className={classes.title}>
                    <div>
                        <Typography variant="h5">
                            {act.title}
                        </Typography>
                        <Typography variant="h6" className={classes.weight} style={{ fontStyle: "italic" }}>
                            {act.activityType}
                        </Typography>
                    </div>
                    <IconButton style={{ flexShrink: "0", flexGrow: 0 }} aria-label="More options" onClick={this.handleMenuOpen(index)}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchor[index]}
                        keepMounted
                        open={isOpen[index]}
                        onClose={this.handleMenuClose(index)}
                    >
                        <MenuItem onClick={this.goToEdit(act._id, act.activityType)}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDetailsOpen(index)}>Details</MenuItem>
                    </Menu>
                </div>
                <div className={classes.bottom}>
                    <div>
                        <Typography variant="subtitle1" className={classes.weight}>
                            {act.author.name}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.weight}>
                            {(new Date(act.createDate)).toDateString()}
                        </Typography>
                    </div>
                    <div>


                    </div>


                </div>



            </Paper>)
        })

        const likedList = liked.map((act, index) => {
            return (<Paper elevation={4} key={index} className={classes.activity} onClick={this.goToPlay(act._id, act.activityType)}>
                <div className={classes.title}>
                    <div>
                        <Typography variant="h5">
                            {act.title}
                        </Typography>
                        <Typography variant="h6" className={classes.weight} style={{ fontStyle: "italic" }}>
                            {act.activityType}
                        </Typography>
                    </div>
                    <IconButton style={{ flexShrink: "0", flexGrow: 0 }} aria-label="More options" onClick={this.handleMenuOpen(index)}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchor[index]}
                        keepMounted
                        open={isOpen[index]}
                        onClose={this.handleMenuClose(index)}
                    >
                        <MenuItem onClick={this.goToEdit(act._id, act.activityType)}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDetailsOpen(index)}>Details</MenuItem>
                    </Menu>
                </div>
                <div className={classes.bottom}>
                    <div>
                        <Typography variant="subtitle1" className={classes.weight}>
                            {act.author.name}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.weight}>
                            {(new Date(act.createDate)).toDateString()}
                        </Typography>
                    </div>
                    <div>


                    </div>


                </div>



            </Paper>)
        })

        return (
            <div className={classes.container}>


                <div className={classes.acts}>
                    <div><Typography variant="h4" className={classes.helpTxt} style={{  }}>
                        Your Activities
                        </Typography>
                        </div>
                    {list}
                    <div><Typography variant="h4" className={classes.helpTxt} style={{  }}>
                        Activities you liked
                        </Typography>
                        </div>
                    {likedList}
                </div>


                <Dialog open={detailsOpen} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
                    {Object.keys(details).length != 0 ? (<div>
                        <DialogTitle id="simple-dialog-title">{details.title} - {details.activityType}</DialogTitle>

                        <DialogContent>
                            <div style={{ margin: 20 }}>
                                <Typography variant="h5" style={{ margin: 20 }}>
                                    Category: {details.category}
                                </Typography>
                                <Typography variant="h5" style={{ margin: 20 }}>
                                    No. of Term(s): {details.cards ? details.cards.length : ""}
                                    {details.quiz ? details.quiz.length : ""}
                                </Typography>
                            </div>
                        </DialogContent>

                    </div>) : <div></div>}

                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);