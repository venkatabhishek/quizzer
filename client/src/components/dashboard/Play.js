import React, { Component } from 'react';
import queryString from 'query-string';



class Play extends Component {

    render(){

        const parsed = queryString.parse(this.props.location.search);

        switch (parsed.type) {
            case "f":
                return <Flashcards />
            case "q":
                return <Quiz />
            default:
                return <div>Error</div>
                break;
        }


    }

}

export default Edit;