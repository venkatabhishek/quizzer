import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import auth from './auth/auth-helper';
import { findUserProfile } from '../utils/api-user.js';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
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
import Search from './dashboard/Search'
import Edit from './dashboard/Edit';
import Play from './dashboard/Play'
import Settings from './dashboard/Settings'
import Create from './dashboard/Create'
import NoMatch from './NoMatch'

var routes = [
    {
        path: "",
        exact: true,
        component: Base,

    },
    {
        path: "workspace",
        exact: false,
        component: Profile,

    },
    {
        path: "edit",
        exact: false,
        component: Edit,

    },
    {
        path: "play",
        exact: false,
        component: Play,

    },
    {
        path: "search",
        exact: false,
        component: Search,

    },
    {
        path: "settings",
        exact: false,
        component: Settings,

    },
    {
        path: "create",
        exact: false,
        component: Create,

    }

]

const styles = theme => ({
    list: {
        width: 250,
    },
    navbarItem: {
        margin: "10px 0"
    },
    link: {
        color: "black",
        textDecoration: "none"
    },
    base: {
        width: "100%"
    }

});

class Dashboard extends Component {

    constructor({ match }) {
        super();
        this.state = {
            user: '',
            redirectToSignin: false,
            drawerOpen: false
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

        return (
            <div className={classes.main}>
                <Navbar navigate={this.navigate} toggleDrawer={this.toggleDrawer.bind(this)} />
                <div style={{display: "flex"}}>
                    <Sidebar/>
                    <div className={classes.base}>
                        <Switch>
                            {routesComponent}
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);