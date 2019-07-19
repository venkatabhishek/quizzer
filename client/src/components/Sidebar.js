import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import LanguageIcon from '@material-ui/icons/Language'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'

import {
    withRouter
} from 'react-router-dom'


const styles = theme => ({
    root: {
        width: "500px",
        height: "calc(100vh - 110px)",
        marginTop: 10,
        background: "#fff",
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        paddingTop: 40
    },
    menuLabel: {
        color: "#acacac",
        fontSize: 18,
        marginLeft: 35,
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 600
    },
    link: {
        height: 60,
        width: "100%",
        margin: "30px 0",
        display: "flex",
        alignItems: "center",
        color: "rgba(0,0,0,0.6)",
        fontWeight: 600,
        fontSize: 18,
        cursor: "pointer",
        "&:hover": {
            background: "#f5f5f5"
        }
    },
    highlight: {
        background: "#F1F0FE"
    },
    bar: {
        height: "100%",
        width: 10,
        background: "#623CE9",
    }
})

const links = [
    {
        text: 'Discover',
        link: "",
        icon: LanguageIcon
    },
    {
        text: 'Workspace',
        link: "/workspace",
        icon: DashboardIcon
    },
    {
        text: "Settings",
        link: "/settings",
        icon: SettingsIcon
    }
]


class Sidebar extends React.Component {

    goTo = link => e => {
        this.props.history.push("/app"+link)
    }

    render() {
        const { classes, location } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h4" className={classes.menuLabel}>
                MENU
                </Typography>
                <div className={classes.links}>
                {links.map(({text, icon: Icon, link}, index) => {
                    var bar = location.pathname == "/app"+link ? classes.bar : ""
                    var extra = location.pathname == "/app"+link ? classes.highlight : ""
                    return (<div className={classes.link + " " + extra} key={index} onClick={this.goTo(link)}>
                    <div className={bar}></div>
                        <Icon style={{margin: 40}}/> {text}
                    </div>)
                })}
                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Sidebar));