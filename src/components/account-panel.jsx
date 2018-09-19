import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountPanel extends Component {
    render() {
        return (
            <div className="dropdown">
                <button
                    className="btn-account d-none d-md-flex"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span className="user-avatar">
                        {' '}
                        <img src="/assets/images/avatars/profile.jpg" alt="" />
                    </span>{' '}
                    <span className="account-summary pr-lg-4 d-none d-lg-block">
                        <span className="account-name">{this.props.account.name}</span>{' '}
                        <span className="account-description">Marketing Manager</span>
                    </span>
                </button>

                <div className="dropdown-arrow dropdown-arrow-left" />

                <div className="dropdown-menu">
                    <h6 className="dropdown-header d-none d-md-block d-lg-none">Beni Arisandi</h6>
                    <a className="dropdown-item" href="user-profile.html">
                        <span className="dropdown-icon oi oi-person" /> Profile
                    </a>
                    <a className="dropdown-item" onClick={() => this.props.logout()} href="#">
                        <span className="dropdown-icon oi oi-account-logout" /> Logout
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">
                        Help Center
                    </a>{' '}
                    <a className="dropdown-item" href="#">
                        Ask Forum
                    </a>{' '}
                    <a className="dropdown-item" href="#">
                        Keyboard Shortcuts
                    </a>
                </div>
            </div>
        );
    }
}

AccountPanel.propTypes = {
    account: PropTypes.object,
    logout: PropTypes.func
};

export default AccountPanel;
