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

class PmgrContainer extends Component {
    render() {
        return (
            <div className="app">
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
                                <AccountPanel account={this.props.account} />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

PmgrContainer.propTypes = {
    account: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

export default connect(mapProps)(PmgrContainer);
