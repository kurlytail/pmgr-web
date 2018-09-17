import React, { Component } from 'react';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.name = 'test';
    }

    render() {
        return <div>{this.name}</div>;
    }
}

export default MainContainer;
