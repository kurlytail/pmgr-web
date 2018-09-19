import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reducers from '../reducers';

class LoginPanel extends Component {
    handleChange(event) {
        this.setState({ [event.target.id.replace('auth-signin-', '')]: event.target.value });
    }

    render() {
        return (
            <form
                className="auth-form"
                id="auth-signin-form"
                encType="utf8"
                onSubmit={() => this.props.login(this.state.email, this.state.password)}
            >
                <div className="form-group">
                    <div className="form-label-group">
                        <input
                            type="text"
                            id="auth-signin-email"
                            className="form-control"
                            placeholder="Username"
                            required
                            autoFocus
                            onChange={event => this.handleChange(event)}
                        />
                        <label htmlFor="auth-signin-email">Username</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-label-group">
                        <input
                            type="password"
                            id="auth-signin-password"
                            className="form-control"
                            placeholder="Password"
                            required
                            onChange={event => this.handleChange(event)}
                        />
                        <label htmlFor="auth-signin-password">Password</label>
                    </div>
                </div>

                <div className="form-group">
                    <button className="btn btn-lg btn-primary btn-block" type="submit" id="auth-signin-button">
                        Sign In
                    </button>
                </div>

                <div className="form-group text-center">
                    <div className="custom-control custom-control-inline custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="remember-me" />
                        <label className="custom-control-label" htmlFor="remember-me">
                            Keep me signed in
                        </label>
                    </div>
                </div>

                <div className="text-center pt-3">
                    <a className="link">Forgot Username?</a>
                    <span className="mx-2">·</span>
                    <a className="link">Forgot Password?</a>
                </div>
            </form>
        );
    }
}

LoginPanel.propTypes = {
    login: PropTypes.func
};

const mapProps = () => ({});

const mapDispatch = dispatch => ({
    login: (...params) => {
        dispatch(Reducers.login.login(...params));
    }
});

export default connect(
    mapProps,
    mapDispatch
)(LoginPanel);
