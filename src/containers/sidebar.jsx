import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <aside className="app-aside">
                <div className="aside-content">
                    <header className="aside-header d-block d-md-none">
                        <button
                            className="btn-account"
                            type="button"
                            data-toggle="collapse"
                            data-target="#dropdown-aside"
                        >
                            <span className="user-avatar user-avatar-lg">
                                {' '}
                                <img src="/assets/images/avatars/profile.jpg" alt="" />
                            </span>{' '}
                            <span className="account-icon">
                                {' '}
                                <span className="fa fa-caret-down fa-lg" />
                            </span>{' '}
                            <span className="account-summary">
                                {' '}
                                <span className="account-name">Beni Arisandi</span>{' '}
                                <span className="account-description">Marketing Manager</span>
                            </span>
                        </button>

                        <div id="dropdown-aside" className="dropdown-aside collapse">
                            <div className="pb-3">
                                <a className="dropdown-item" href="user-profile.html">
                                    {' '}
                                    <span className="dropdown-icon oi oi-person" /> Profile
                                </a>{' '}
                                <a className="dropdown-item" href="auth-signin-v1.html">
                                    {' '}
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
                    </header>

                    <section className="aside-menu has-scrollable">
                        <nav id="stacked-menu" className="stacked-menu">
                            <ul className="menu">
                                <li className="menu-item has-active">
                                    <a href="index.html" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-dashboard" />
                                        <span className="menu-text">Dashboard</span>
                                    </a>
                                </li>

                                <li className="menu-header">Organization</li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-puzzle-piece" />{' '}
                                        <span className="menu-text">Components</span>{' '}
                                        <span className="badge badge-warning">New</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="component-general.html" className="menu-link">
                                                General
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-icons.html" className="menu-link">
                                                Icons
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-rich-media.html" className="menu-link">
                                                Rich Media
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-list-views.html" className="menu-link">
                                                List Views
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-sortable-nestable.html" className="menu-link">
                                                Sortable & Nestable
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-activity.html" className="menu-link">
                                                Activity
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-steps.html" className="menu-link">
                                                Steps
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-tasks.html" className="menu-link">
                                                Tasks
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="component-metrics.html" className="menu-link">
                                                Metrics
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-pencil" />
                                        <span className="menu-text">Forms</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="form-basic.html" className="menu-link">
                                                Basic Elements
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="form-autocompletes.html" className="menu-link">
                                                Autocompletes
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="form-pickers.html" className="menu-link">
                                                Pickers
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="form-editors.html" className="menu-link">
                                                Editors
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-grid-two-up" />
                                        <span className="menu-text">Tables</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="table-basic.html" className="menu-link">
                                                Basic Table
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="table-datatables.html" className="menu-link">
                                                Datatables
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-bar-chart" />
                                        <span className="menu-text">Collections</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item has-child">
                                            <a href="#" className="menu-link">
                                                Chart.js
                                            </a>
                                            <ul className="menu">
                                                <li className="menu-item">
                                                    <a href="collection-chartjs-line.html" className="menu-link">
                                                        Line
                                                    </a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="collection-chartjs-bar.html" className="menu-link">
                                                        Bar
                                                    </a>
                                                </li>
                                                <li className="menu-item">
                                                    <a
                                                        href="collection-chartjs-radar-scatter.html"
                                                        className="menu-link"
                                                    >
                                                        Radar & Scatter
                                                    </a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="collection-chartjs-others.html" className="menu-link">
                                                        Others
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item">
                                            <a href="collection-flot-charts.html" className="menu-link">
                                                Flot
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="collection-inline-charts.html" className="menu-link">
                                                Inline charts
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="collection-jqvmap.html" className="menu-link">
                                                Vector Map
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-list-rich" />
                                        <span className="menu-text">Level Menu</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="#" className="menu-link">
                                                Menu item
                                            </a>
                                        </li>
                                        <li className="menu-item has-child">
                                            <a href="#" className="menu-link">
                                                Menu item
                                            </a>
                                            <ul className="menu">
                                                <li className="menu-item">
                                                    <a href="#" className="menu-link">
                                                        Child item
                                                    </a>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="#" className="menu-link">
                                                        Child item
                                                    </a>
                                                </li>
                                                <li className="menu-item has-child">
                                                    <a href="#" className="menu-link">
                                                        Child item
                                                    </a>
                                                    <ul className="menu">
                                                        <li className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                Grand Child item
                                                            </a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                Grand Child item
                                                            </a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                Grand Child item
                                                            </a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                Grand Child item
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item">
                                                    <a href="#" className="menu-link">
                                                        Child item
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#" className="menu-link">
                                                Menu item
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-header">Pages</li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-wrench" />
                                        <span className="menu-text">Auth</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="auth-comingsoon-v1.html" className="menu-link">
                                                Coming Soon v1
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-comingsoon-v2.html" className="menu-link">
                                                Coming Soon v2
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-cookie-consent.html" className="menu-link">
                                                Cookie Consent
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-empty-state.html" className="menu-link">
                                                Empty State
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-error-v1.html" className="menu-link">
                                                Error Page v1
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-error-v2.html" className="menu-link">
                                                Error Page v2
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-error-v3.html" className="menu-link">
                                                Error Page v3
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-maintenance.html" className="menu-link">
                                                Maintenance
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-page-message.html" className="menu-link">
                                                Page Message
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-session-timeout.html" className="menu-link">
                                                Session Timeout
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-signin-v1.html" className="menu-link">
                                                Sign In v1
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-signin-v2.html" className="menu-link">
                                                Sign In v2
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-signup.html" className="menu-link">
                                                Sign Up
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-recovery-username.html" className="menu-link">
                                                Recovery Username
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-recovery-password.html" className="menu-link">
                                                Recovery Password
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="auth-lockscreen.html" className="menu-link">
                                                Screen Locked
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-people" />
                                        <span className="menu-text">User</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="user-profile.html" className="menu-link">
                                                Profile
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-activities.html" className="menu-link">
                                                Activities
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-teams.html" className="menu-link">
                                                Teams
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-projects.html" className="menu-link">
                                                Projects
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-tasks.html" className="menu-link">
                                                Tasks
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-profile-settings.html" className="menu-link">
                                                Profile Settings
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-account-settings.html" className="menu-link">
                                                Account Settings
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-billing-settings.html" className="menu-link">
                                                Billing Settings
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="user-notification-settings.html" className="menu-link">
                                                Notification Settings
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="menu-item has-child">
                                    <a href="#" className="menu-link">
                                        {' '}
                                        <span className="menu-icon oi oi-infinity" />
                                        <span className="menu-text">Apps</span>
                                    </a>
                                    <ul className="menu">
                                        <li className="menu-item">
                                            <a href="app-messages.html" className="menu-link">
                                                Messages
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="app-conversations.html" className="menu-link">
                                                Conversations
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="app-tasks.html" className="menu-link">
                                                Tasks
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="app-feeds.html" className="menu-link">
                                                Feeds
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
