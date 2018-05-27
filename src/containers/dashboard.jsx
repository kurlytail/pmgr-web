import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        return <div />;
    }
}

const mapProps = (state, props) => {
    return {
        system: state.app.local
    };
};

const mapDispatch = (dispatch, props) => {
    return {};
};

const dashboard = connect(mapProps, mapDispatch)(Dashboard);
export default dashboard;
