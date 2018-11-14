import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import _ from 'lodash';
import ToplevelFooter from '../components/toplevel-footer';
import { ConfirmationForm } from '@kurlytail/user-registration';
import { Redirect } from 'react-router';
import ErrorCard from '../components/error-card';
import QueryString from 'query-string';
import RegistrationHeader from '../components/registration-header';
import Spinner from '../components/spinner';

class ConfirmationPanel extends Component {
    render() {
        const { email, hash } = QueryString.parse(this.props.location.search);
        if (this.props.account) {
            return <Redirect to="/" />;
        }
        return (
            <main className="auth">
                <RegistrationHeader />
                {this.props.state.error ? (
                    <ErrorCard topic="Server error" error={this.props.state.error} />
                ) : (
                    <Spinner loading={this.props.state.isDeleting}>
                        <ConfirmationForm
                            state={this.props.state}
                            actions={this.props.actions}
                            email={email}
                            hash={hash}
                        />
                    </Spinner>
                )}
                <ToplevelFooter />
            </main>
        );
    }
}

ConfirmationPanel.propTypes = {
    state: PropTypes.any,
    actions: PropTypes.any,
    account: PropTypes.any,
    location: PropTypes.object
};

const mapProps = state => ({
    state: _.get(state, Reducers.register.STATE_PATH),
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

const mapDispatch = dispatch => ({
    actions: bindActionCreators({ ...Reducers.register }, dispatch)
});

export default connect(
    mapProps,
    mapDispatch
)(ConfirmationPanel);
