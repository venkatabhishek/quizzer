import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
    withRouter
} from 'react-router-dom'


const style = theme => ({

})


class Sidebar extends React.Component {

    render(){
        return(
            <div>
Sidebar
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Sidebar));