import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import Pmgr from './pmgr';
import { Redirect } from 'react-router';

class MainContainer extends Component {
    render() {
        if (!this.props.account) {
            return <Redirect to="/login" />;
        }
        return <Pmgr />;
    }
}

MainContainer.propTypes = {
    account: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

export default connect(mapProps)(MainContainer);
