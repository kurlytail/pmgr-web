import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import _ from 'lodash';
import ToplevelFooter from '../components/toplevel-footer';
import RegistrationHeader from '../components/registration-header';
import { RegistrationForm } from '@kurlytail/user-registration';
import { Redirect } from 'react-router';
import Spinner from '../components/spinner';
import ErrorCard from '../components/error-card';
import InfoCard from '../components/info-card';

class RegistrationPanel extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.getRegistration().catch(() => {});
    }

    render() {
        if (this.props.account) {
            return <Redirect to="/" />;
        }
        return (
            <main className="auth">
                <RegistrationHeader />
                {this.props.state.error ? (
                    <ErrorCard topic="Server error" error={this.props.state.error} />
                ) : (
                    <Spinner loading={this.props.state.isFetchingItem}>
                        {this.props.state.items.length === 0 ? (
                            <RegistrationForm state={this.props.state} actions={this.props.actions} />
                        ) : (
                            <InfoCard topic="You registered successfully" info="Please check your email" />
                        )}
                    </Spinner>
                )}
                <ToplevelFooter />
            </main>
        );
    }
}

RegistrationPanel.propTypes = {
    state: PropTypes.any,
    actions: PropTypes.any,
    account: PropTypes.any
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
)(RegistrationPanel);
