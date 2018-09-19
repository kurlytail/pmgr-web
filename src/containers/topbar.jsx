import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Reducers from '../reducers';
import SearchComponent from '../components/search';
import ActivitiesDropdown from './activities-dropdown';
import MessagesDropdown from './messages-dropdown';
import AppmenuDropdown from './appmenu-dropdown';
import AccountPanel from '../components/account-panel';

class Topbar extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="top-bar">
                    <div className="top-bar-brand">
                        <a href="index.html">
                            <img src="/assets/images/brand-inverse.png" height="32" alt="" />
                        </a>
                    </div>

                    <div className="top-bar-list">
                        <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
                            <button
                                className="hamburger hamburger-squeeze"
                                type="button"
                                data-toggle="aside"
                                aria-label="Menu"
                                aria-controls="navigation"
                            >
                                <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </button>
                        </div>

                        <SearchComponent />

                        <div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">
                            <ul className="header-nav nav">
                                <ActivitiesDropdown />
                                <MessagesDropdown />
                                <AppmenuDropdown />
                            </ul>
                            <AccountPanel account={this.props.account} logout={this.props.logout} />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Topbar.propTypes = {
    account: PropTypes.any,
    logout: PropTypes.func
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

const mapDispatch = dispatch => ({
    logout: () => {
        dispatch(Reducers.login.logout());
    }
});

export default connect(
    mapProps,
    mapDispatch
)(Topbar);
