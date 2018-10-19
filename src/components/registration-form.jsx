import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';
import _ from 'lodash';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._reCaptchaRef = React.createRef();
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.actions.createRegister(this.state);
    }

    render() {
        return (
            <form className="auth-form" method="POST" id="user-registration-form" encType="utf8">
                <div className="form-group">
                    <div className="form-label-group">
                        <label>email</label>
                        <input
                            type="email"
                            className="form-control"
                            required
                            autoFocus
                            id="user-registration-email"
                            onChange={event => this.handleEmail(event)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    {_.get(this.props.state, 'item.captchaKey') && !_.get(this.props.state, 'isFetching') ? (
                        <ReCAPTCHA
                            id="user-registration-captcha"
                            sitekey={_.get(this.props.state, 'item.captchaKey')}
                            onChange={value => this.dataCallback(value)}
                            onExpired={() => this.dataExpiredCallback()}
                            onError={() => this.dataErrorCallback()}
                            ref={this._reCaptchaRef}
                        />
                    ) : (
                        <div />
                    )}
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        id="signup-button"
                        disabled={!this.state.reReCaptchaResponse || !this.state.email}
                        onClick={e => this.onSubmit(e)}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        );
    }

    dataCallback(value) {
        this.setState({ reReCaptchaResponse: value });
    }

    dataExpiredCallback() {
        this.setState({ reReCaptchaResponse: null });
    }

    dataErrorCallback() {
        this.setState({ reReCaptchaResponse: null });
    }
}

RegistrationForm.propTypes = {
    state: PropTypes.any,
    actions: PropTypes.any
};

export default RegistrationForm;
