import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import _ from 'lodash';
import AuthFooter from '../components/auth-footer';
import AuthHeader from '../components/auth-header';
import AuthForm from '../components/auth-form';

class LoginPanel extends Component {
    render() {
        if (this.props.account) {
            return <div />;
        }

        return (
            <main className="auth">
                <AuthHeader />
                <AuthForm login={this.props.login} pending={_.get(this.props, 'account.pending')} />
                <AuthFooter />
            </main>
        );
    }
}

LoginPanel.propTypes = {
    login: PropTypes.func,
    account: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}`)
});

const mapDispatch = dispatch => ({
    login: (...params) => {
        dispatch(Reducers.login.login(...params));
        return false;
    }
});

export default connect(
    mapProps,
    mapDispatch
)(LoginPanel);
