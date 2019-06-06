import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { findActivity } from '../../../../utils/api-activity'

const styles = theme => ({
    headText: {
        padding: 55
    },
    title: {
        margin: 40,
        display: "inline"
    },
    category: {
        margin: 40
    },
    editBtn: {
        float: "right",
        marginLeft: 20
    },
    column: {
        margin: "auto"
    },
    box: {
        width: 200,
        minHeight: 100,
        margin: "auto",
        padding: 20,
        marginBottom: 40
    },
    answer:{
        padding: 20,
        marginBottom: 20
    },
    question: {
        marginBottom: 40
    }
})

class Test extends Component {

    constructor(props){
        super(props);

        this.state = {
            quiz: [],
            title: "",
            category: ""
        }
    }

    edit = () => {
        this.props.history.push('/app/edit?type=q&q='+this.state._id)
    }

    componentWillMount(){
        const values = queryString.parse(this.props.location.search);

        if(values.q){

            findActivity(values.q).then((data) => {

                this.setState(data)

            }).catch(err => {
                console.log(err)
            })
        }else{
            this.setState({
                exists: false
            })
        }
    }

    render(){
        const { classes } = this.props;

        const { quiz, title } = this.state;

        return (
            <div style={{overflow: "hidden"}}>

               
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Test));