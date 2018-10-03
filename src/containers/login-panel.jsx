import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import _ from 'lodash';

class LoginPanel extends Component {
    handleChange(event) {
        this.setState({ [event.target.id.replace('auth-signin-', '')]: event.target.value });
    }

    render() {
        return (
            <main className="auth">
                <header
                    id="auth-header"
                    className="auth-header"
                    style={{ backgroundImage: 'url(assets/images/illustration/img-1.png)' }}
                >
                    <h1>
                        <img src="assets/images/brand-inverse.png" alt="" height="72" />
                        <span className="sr-only">Sign In</span>
                    </h1>
                    <p>
                        {"Don't have a account?"}
                        <a href="auth-signup.html">Create One</a>
                    </p>
                </header>
                <form className="auth-form" id="auth-signin-form" encType="utf8">
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
                        <button
                            className="btn btn-lg btn-primary btn-block"
                            id="auth-signin-button"
                            onClick={e => {
                                this.props.login(this.state.email, this.state.password);
                                e.preventDefault();
                            }}
                        >
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

                <footer className="auth-footer">
                    © 2018 All Rights Reserved.
                    <a href="#">Privacy</a>
                    and
                    <a href="#">Terms</a>
                </footer>
            </main>
        );
    }
}

LoginPanel.propTypes = {
    login: PropTypes.func,
    pending: PropTypes.any
};

const mapProps = state => ({
    pending: _.get(state, `${Reducers.login.STATE_PATH}.pending`)
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
