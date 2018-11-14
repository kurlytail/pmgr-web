import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import Pmgr from './pmgr';
import { Redirect } from 'react-router';

class MainContainer extends Component {
    render() {
        if (this.props.account) {
            return <Pmgr />;
        }

        if (this.props.location.pathname && this.props.location.pathname.startsWith('/auth')) {
            return <div />;
        }

        return <Redirect to="/auth/login" />;
    }
}

MainContainer.propTypes = {
    account: PropTypes.any,
    location: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

export default connect(mapProps)(MainContainer);
