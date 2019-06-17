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



import auth from '../components/auth/auth-helper';

import {
  withRouter
} from 'react-router-dom'


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: "pointer"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  option: {
    margin: "auto",
    maxWidth: "100% !important",
    [theme.breakpoints.down('sm')]: {
        width:"100%",
        flexBasis: "100%"
    }
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: 25,
    [theme.breakpoints.down('sm')]: {
        flexBasis: "100%",
        margin: "25px 0"
    }
  },
  choose: {
    float: "right"
  },
  description: {
    margin: 30,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("sm")]: {
        width: "100%"
    },
    position: "fixed",
  },


});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
    drawerOpen: false
  };


  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };


  handleOpen = () => {
    this.setState({ open: true });
    this.handleMobileMenuClose();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  navigate = (to) => (e) => {
    this.handleClose();
    this.handleMenuClose();
    this.props.history.push(`/app/${to}`)
  }

  logout = () => (e) => {
    this.handleMenuClose();
    auth.signout(() => {
      this.props.history.push('/');
    })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, toggleDrawer } = this.props;
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
        <MenuItem onClick={this.navigate("profile")}>Profile</MenuItem>
        <MenuItem onClick={this.navigate("Settings")}>Settings</MenuItem>
        <MenuItem onClick={this.logout()}>Logout</MenuItem>
      </Menu>
    );


    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleOpen}>
          <IconButton color="inherit" >
              <AddBox />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </MenuItem>
      </Menu>
    );



    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap onClick={this.navigate("")}>
              Quizzer
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                color="inherit"
                onClick={this.handleOpen}
              >
                  <AddBox />
              </IconButton>
              <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Dialog
          open={this.state.open}
          fullWidth={true}
          maxWidth={"md"}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Activity</DialogTitle>
          <DialogContent>

          <Grid container spacing={0}>

            <Grid item xs={6} className={classes.option}>
              <Paper className={classes.paper+" "+classes.quiz} elevation={5}>
                <Typography variant="h4" style={{marginBottom: 10}}>
                  Quiz
                </Typography>
                <Typography variant="h5" className={classes.description} gutterBottom >
                  A multiple choice, dynamic quiz, ideal for practicing the real thing
                </Typography>

                <Button variant="contained" color="secondary" className={classes.choose} onClick={this.navigate("edit?type=q")}>Choose</Button>

              </Paper>

            </Grid>
            <Grid item xs={6} className={classes.option}>
              <Paper className={classes.paper+" "+classes.flash} elevation={5}>

                <Typography variant="h4" style={{marginBottom: 10}}>
                  Flashcards
                </Typography>

                <Typography variant="h5" gutterBottom className={classes.description}>
                  Two-sided key-definition cards, perfect for vocabulary, etc...
                </Typography>

                <Button variant="contained" color="secondary" className={classes.choose} onClick={this.navigate("edit?type=f")}>Choose</Button>

              </Paper>
            </Grid>

          </Grid>


          </DialogContent>
        </Dialog>
        {renderMenu}
        {renderMobileMenu}




      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));