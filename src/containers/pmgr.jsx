import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Dashboard from './dashboard';

class PmgrContainer extends Component {
    render() {
        return (
            <div className="app">
                <Topbar />
                <Sidebar />
                <Dashboard />
            </div>
        );
    }
}

PmgrContainer.propTypes = {
    account: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

export default connect(mapProps)(PmgrContainer);
