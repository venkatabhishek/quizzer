import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import auth from './auth/auth-helper';
import { findUserProfile } from '../utils/api-user.js';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Home from '@material-ui/icons/Home'
import AccountBox from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'

import { Switch, Route, Link } from 'react-router-dom';


import Profile from './dashboard/Profile';
import Base from './dashboard/Base';
import Edit from './dashboard/Edit';
import Play from './dashboard/Play'
import Settings from './dashboard/Settings'
import NoMatch from './NoMatch'

var routes = [
    {
        path: "",
        exact: true,
        component: Base,
        icon: Home,
        name: "Home"
    },
    {
        path: "profile",
        exact: false,
        component: Profile,
        icon: AccountBox,
        name: "Profile"
    },
    {
        path: "edit",
        exact: false,
        component: Edit,
        exclude: true
    },
    {
        path: "play",
        exact: false,
        component: Play,
        exclude: true
    },
    {
        path: "settings",
        exact: false,
        component: Settings,
         icon: SettingsIcon,
         name: "Settings"
    },

]

const styles = theme => ({
    list: {
        width: 250,
    },
    nospace: {
        marginLeft:0,
        transition: "margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"
    },
    space: {
        marginLeft: 250,
        transition: "margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"
    },
    navbarItem: {
        margin: "10px 0"
    },
    link: {
        color: "black",
        textDecoration: "none"
    }
});

class Dashboard extends Component {

    constructor({ match }) {
        super();
        this.state = {
            user: '',
            redirectToSignin: false,
            drawerOpen: true
        };
        this.match = match;
    }

    componentWillMount() {
        this.setState({ redirectToSignin: false })
        const jwt = auth.isAuthenticated();
        if (jwt) {
            findUserProfile(
                {
                    userId: jwt.user._id
                },
                { t: jwt.token }
            ).then(data => {
                if (data.error) {
                    this.setState({ redirectToSignin: true });
                } else {
                    this.setState({ user: data });
                }
            });
        } else {
            this.setState({ redirectToSignin: true });
        }
    }

    toggleDrawer = () => {
      this.setState({
          drawerOpen: !this.state.drawerOpen
      })
  }


    render() {
        const { classes, match } = this.props;
        const { user, drawerOpen } = this.state
        const redirectToSignin = this.state.redirectToSignin;
        if (redirectToSignin) {
            return <Redirect to="/signin" />;
        }



        const routesComponent = routes.map(({ path, component: Component, exact }, key) => (
            <Route path={`/app/${path}`}
                render={(props) => <Component {...props} user={user} />}
                exact={exact}
                key={key}
            />
        ));

        const sideRoutes = routes.filter(r => !r.exclude)

        const sideList = (
            <div
                className={classes.list}
                role="presentation"
                onKeyDown={this.toggleDrawer}
                style={{ marginTop: 64 }}
            >
                <List>
                    {sideRoutes.map(({path, name, icon: Icon}, index) => {
                        return ((
                        <Link to={`/app/${path}`} className={classes.link} key={index}>
                        <ListItem button key={index} className={classes.navbarItem}>
                            <ListItemIcon><Icon /></ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                        </Link>
                    ))
                    })}
                </List>

            </div>
        );

        var sideSpace = drawerOpen ? classes.space : classes.nospace;


        return (
            <div className={classes.main}>
                <Navbar navigate={this.navigate} toggleDrawer={this.toggleDrawer.bind(this)} />
                <div className={sideSpace} style={{paddingTop: 64}}>
                    <Switch>
                        {routesComponent}
                        <Route component={NoMatch} />
                    </Switch>
                </div>
                <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer} variant="persistent" >
                    {sideList}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);