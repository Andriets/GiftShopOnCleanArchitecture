import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>404 - Not Found!</h1>
                <Link to="/">
                    Go Home
                </Link>
            </>
        );
    }
}