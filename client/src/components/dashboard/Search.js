import React, { Component } from 'react';
import { searchActivities, getAllActivities, likeActivity } from '../../utils/api-activity';
import auth from '../auth/auth-helper';
import { findUserProfile } from '../../utils/api-user.js';

import queryString from 'query-string'

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
    container: {
        display: "flex",
        flexWrap: "wrap"
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
        alignItems: "baseline",
        marginBottom: 20
    },
    weight: {
        fontWeight: "normal"
    }
})

class Base extends Component {

    constructor(props) {
        super(props);


        this.state = {
            activities: [],
            anchor: [],
            liked: [],
            likes: [],
            detailsOpen: false,
            details: {},
            search: "",
        }

    }

    componentWillMount = () => {
        this.getData();
    }

    componentDidUpdate = () => {
        const parsed = queryString.parse(this.props.location.search);

        if(parsed.q != this.state.search){
            this.getData();
        }
    }

    getData = () => {
        const parsed = queryString.parse(this.props.location.search);

        if (parsed.q) {
            searchActivities(parsed.q).then(data => {


                var anchor = []

                data.results.forEach(() => {
                    anchor.push(null)
                })

                const jwt = auth.isAuthenticated();

                findUserProfile(
                    {
                        userId: jwt.user._id
                    },
                    { t: jwt.token }
                ).then(user => {
                    this.setState({
                        activities: data.results,
                        anchor,
                        liked: user.liked,
                        search: parsed.q,

                    })
                });


            }).catch(err => {
                console.log(err)
            })
        }
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

    like = (id) => (e) => {
        e.stopPropagation();
        var { liked } = this.state;
        const jwt = auth.isAuthenticated();
        likeActivity(id, { t: jwt.token }).then(res => {
            var idx = liked.indexOf(id);

            if (idx == -1) {
                liked.push(id)
            } else {
                liked.splice(idx, 1);
            }


            this.setState({
                liked
            })
        }).catch(err => {
            console.log(err)
        })
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

    handleDetailsOpen = (index) => (e) => {

        e.stopPropagation();

        var { activities } = this.state;

        this.setState({
            detailsOpen: true,
            details: activities[index]
        })
    }

    render() {
        const { classes, user } = this.props;
        const { activities, anchor, liked, detailsOpen, details, search } = this.state;


        const isOpen = anchor.map(an => {
            return Boolean(an);
        })

        if(activities.length == 0){
            return (<Typography variant="h4" style={{width: "100%", margin: 40, color: "grey"}}>
                    No results found ...
                </Typography>)
        }

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

                        <IconButton style={{ flexShrink: "0", flexGrow: 0 }} aria-label="More options" onClick={this.like(act._id)}>
                            {(liked.indexOf(act._id) == -1) ?
                                <FavoriteBorder /> :
                                <Favorite color="error" />}
                        </IconButton>
                    </div>


                </div>



            </Paper>)
        })



        return (
            <div className={classes.container}>
                <Typography variant="h4" style={{width: "100%", margin: 40}}>
                    Results for "{search}"
                </Typography>

                {list}

                <Dialog open={detailsOpen} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
                    {details ? (<div>
                        <DialogTitle id="simple-dialog-title">{details.title} - {details.activityType}</DialogTitle>

                        <DialogContent>
                            <div style={{ margin: 20 }}>
                                <Typography variant="h5" style={{ margin: 20 }}>
                                    Category: {details.category}
                                </Typography>
                                <Typography variant="h5" style={{ margin: 20 }}>
                                    No. of Term(s): {details.cards ? details.cards.length : ""}
                                    {details.quiz ? details.cards.length : ""}
                                </Typography>
                            </div>
                        </DialogContent>

                    </div>) : <div></div>}

                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Base);