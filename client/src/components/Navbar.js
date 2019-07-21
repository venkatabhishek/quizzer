import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddBox from '@material-ui/icons/AddBox';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import auth from '../components/auth/auth-helper';

import {
    withRouter
} from 'react-router-dom'


const styles = theme => ({

    root: {
        width: '100%',
        height: 100,
        fontFamily: '"Montserrat", sans-serif',
        background: "#fff"
    },
    logo: {
        width: 400,
        height: "100%",
        fontSize: "36px",
        fontWeight: 700,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
    search: {
        display: 'flex',
        alignItems: "center",
        width: "100%",
    },
    light: {
        color: "#ACACAC"
    },
    full: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: "center"
    },
    fullInner: {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: "center",
        justifyContent: "flex-end",
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        fontSize: 18,
        width: "100%",
        '&::placeholder': {
            color: "#acacac"
        },
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 600
    },
    create: {
        width: 190,
        height: 50,
        background: "#623CE9",
        borderRadius: 4,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: 500,
        letterSpacing: "0.5px",
        marginRight: 30
    },
    avatar: {
        borderRadius: "50%",
        width: 55,
        height: 55,
        background: "#623CE9",
        marginRight: 30,
        cursor: "pointer"
    },
    mobileNav: {
        display: 'none',
        height: "100%",
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexFlow: "row wrap"
        }
    },
    mobileLogo: {
        display: 'flex',
        justifyContent: "space-around"
    },
    deskNav: {
        display: 'flex',
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }



});

class PrimarySearchAppBar extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        open: false,
        drawerOpen: false,
        search: ""
    };


    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    navigate = (to) => (e) => {
        this.handleMenuClose();
        this.props.history.push(`/app/${to}`)
    }

    onSearch = (e) => {
        e.preventDefault();


        this.props.history.push('/app/search?q=' + this.state.search)
    }

    onChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    logout = () => (e) => {
        this.handleMenuClose();
        auth.signout(() => {
            this.props.history.push('/');
        })
    }

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes, toggleDrawer, user } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.navigate("workspace")}>Profile</MenuItem>
                <MenuItem onClick={this.navigate("settings")}>Settings</MenuItem>
                <MenuItem onClick={this.logout()}>Logout</MenuItem>
            </Menu>
        );




        return (
            <div className={classes.root}>
                <div className={classes.deskNav}>
                    <div className={classes.logo} >
                        <span onClick={this.navigate("")} style={{cursor: "pointer"}}>Quizzer</span>
                    </div>
                    <div className={classes.full}>
                        <div className={classes.search}>
                            <SearchIcon className={classes.light} style={{ margin: 40 }} />
                            <form style={{ width: "100%" }} onSubmit={this.onSearch}>
                                <input
                                    placeholder="Search by keyword or tags..."
                                    className={classes.searchInput}
                                    value={this.state.search}
                                    onChange={this.onChange}
                                />  
                            </form>
                        </div>
                        <div className={classes.fullInner}>
                            <div className={classes.create} onClick={this.navigate("create")}>
                                Create Activity
                            </div>
                            <div className={classes.avatar} style={{backgroundImage: `url(https://api.adorable.io/avatars/285/${user.email})`, backgroundSize: "contain"}} onClick={this.handleProfileMenuOpen}>
                            </div>
                            {renderMenu}
                        </div>
                    </div>

                </div>
                <div className={classes.mobileNav}>
                    <div className={classes.logo + " " + classes.mobileLogo}>
                        <span onClick={this.navigate("")} style={{cursor: "pointer"}}>Q</span>
                        <div className={classes.avatar} style={{backgroundImage: `url(https://api.adorable.io/avatars/285/${user.email})`, backgroundSize: "contain"}} onClick={this.handleProfileMenuOpen}>
                            </div>
                    </div>
                    
                            {renderMenu}
                </div>


            </div>



        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));