import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import LoginPanel from './login-panel';
import Reducers from '../reducers';

class MainContainer extends Component {
    render() {
        return this.props.account ? <div>Logged in</div> : <LoginPanel />;
    }
}

MainContainer.propTypes = {
    account: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

export default connect(mapProps)(MainContainer);
