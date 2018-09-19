import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Reducers from '../reducers';

class Dashboard extends Component {
    render() {
        return (
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <header className="page-title-bar">
                                <p className="lead">
                                    <span className="font-weight-bold">Hi, Beni.</span>
                                    <span className="d-block text-muted">
                                        Here’s what’s happening with your business today.
                                    </span>
                                </p>
                            </header>

                            <div className="page-section">
                                <div className="section-block">
                                    <div className="metric-row">
                                        <div className="col-lg-9">
                                            <div className="metric-row metric-flush">
                                                <div className="col">
                                                    <a
                                                        href="user-teams.html"
                                                        className="metric metric-bordered align-items-center"
                                                    >
                                                        <h2 className="metric-label">Active Documents</h2>
                                                        <p className="metric-value h3">
                                                            <sub>
                                                                <i className="oi oi-people" />
                                                            </sub>
                                                            <span className="value">8</span>
                                                        </p>
                                                    </a>
                                                </div>

                                                <div className="col">
                                                    <a
                                                        href="user-projects.html"
                                                        className="metric metric-bordered align-items-center"
                                                    >
                                                        <h2 className="metric-label">Active Projects</h2>
                                                        <p className="metric-value h3">
                                                            <sub>
                                                                <i className="oi oi-fork" />
                                                            </sub>
                                                            <span className="value">12</span>
                                                        </p>
                                                    </a>
                                                </div>

                                                <div className="col">
                                                    <a
                                                        href="user-tasks.html"
                                                        className="metric metric-bordered align-items-center"
                                                    >
                                                        <h2 className="metric-label">Active Tasks</h2>
                                                        <p className="metric-value h3">
                                                            <sub>
                                                                <i className="fa fa-tasks" />
                                                            </sub>
                                                            <span className="value">64</span>
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <a href="user-tasks.html" className="metric metric-bordered">
                                                <div className="metric-badge">
                                                    <span className="badge badge-lg badge-success">
                                                        <span className="oi oi-media-record pulse mr-1" /> ONGOING TASKS
                                                    </span>
                                                </div>
                                                <p className="metric-value h3">
                                                    <sub>
                                                        <i className="oi oi-timer" />
                                                    </sub>
                                                    <span className="value">8</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 col-lg-12 col-xl-4">
                                        <section className="card card-fluid">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-3">
                                                    <h3 className="card-title mr-auto">Completion Tasks</h3>

                                                    <div className="card-title-control">
                                                        <div className="form-group dropdown">
                                                            <button className="btn btn-light" data-toggle="dropdown">
                                                                <span>This Week</span>
                                                                <i className="fa fa-fw fa-caret-down" />
                                                            </button>
                                                            <div className="dropdown-arrow dropdown-arrow-right" />

                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="list-group list-group-flush">
                                                                    <a
                                                                        href="#"
                                                                        className="list-group-item justify-content-between"
                                                                    >
                                                                        <span>Today</span>
                                                                        <span className="text-muted">Mar 27</span>
                                                                    </a>

                                                                    <a
                                                                        href="#"
                                                                        className="list-group-item justify-content-between"
                                                                    >
                                                                        <span>Yesterday</span>
                                                                        <span className="text-muted">Mar 26</span>
                                                                    </a>

                                                                    <a
                                                                        href="#"
                                                                        className="list-group-item justify-content-between"
                                                                    >
                                                                        <span>This Week</span>
                                                                        <span className="text-muted">Mar 21-27</span>
                                                                    </a>

                                                                    <a
                                                                        href="#"
                                                                        className="list-group-item justify-content-between"
                                                                    >
                                                                        <span>This Month</span>
                                                                        <span className="text-muted">Mar 1-31</span>
                                                                    </a>

                                                                    <a
                                                                        href="#"
                                                                        className="list-group-item justify-content-between"
                                                                    >
                                                                        <span>This Year</span>
                                                                        <span className="text-muted">2018</span>
                                                                    </a>

                                                                    <input
                                                                        id="flatpickr"
                                                                        type="hidden"
                                                                        className="form-control d-none"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="chartjs" style={{ height: '283px' }}>
                                                    <canvas id="completion-tasks" />
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-4">
                                        <section className="card card-fluid">
                                            <div className="card-body">
                                                <h3 className="card-title">Tasks Performance</h3>

                                                <div className="text-center pt-3">
                                                    <div className="chart-inline-group" style={{ height: '214px' }}>
                                                        <div
                                                            className="easyPieChart"
                                                            data-percent="60"
                                                            data-size="214"
                                                            data-barcolor="#346CB0"
                                                            data-trackcolor="false"
                                                            data-scalecolor="false"
                                                            data-rotate="225"
                                                        />
                                                        <div
                                                            className="easyPieChart"
                                                            data-percent="50"
                                                            data-size="174"
                                                            data-barcolor="#00A28A"
                                                            data-trackcolor="false"
                                                            data-scalecolor="false"
                                                            data-rotate="225"
                                                        />
                                                        <div
                                                            className="easyPieChart"
                                                            data-percent="75"
                                                            data-size="134"
                                                            data-barcolor="#5F4B8B"
                                                            data-trackcolor="false"
                                                            data-scalecolor="false"
                                                            data-rotate="225"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <div className="card-footer-item">
                                                    <i className="fa fa-fw fa-circle text-indigo" /> 100%
                                                    <div className="text-muted small">Assigned</div>
                                                </div>
                                                <div className="card-footer-item">
                                                    <i className="fa fa-fw fa-circle text-purple" /> 75%
                                                    <div className="text-muted small">Completed</div>
                                                </div>
                                                <div className="card-footer-item">
                                                    <i className="fa fa-fw fa-circle text-teal" /> 60%
                                                    <div className="text-muted small">Active</div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-4">
                                        <section className="card card-fluid">
                                            <div className="card-body pb-0">
                                                <h3 className="card-title">Project documents</h3>

                                                <ul className="list-inline small">
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-fw fa-circle text-light" /> Tasks
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-fw fa-circle text-purple" /> Completed
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-fw fa-circle text-teal" /> Active
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-fw fa-circle text-red" /> Overdue
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="list-group list-group-flush">
                                                <div className="list-group-item">
                                                    <div className="list-group-item-figure">
                                                        <a
                                                            href="user-profile.html"
                                                            className="user-avatar"
                                                            data-toggle="tooltip"
                                                            title="Martha Myers"
                                                        >
                                                            <img src="/assets/images/avatars/uifaces15.jpg" alt="" />
                                                        </a>
                                                    </div>

                                                    <div className="list-group-item-body">
                                                        <div
                                                            className="progress bg-white rounded-0"
                                                            data-toggle="tooltip"
                                                            data-html="true"
                                                            title="&lt;div className=&quot;text-left small&quot;&gt;&lt;i className=&quot;fa fa-fw fa-circle text-purple&quot;&gt;&lt;/i&gt; 2065&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-teal&quot;&gt;&lt;/i&gt; 231&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-red&quot;&gt;&lt;/i&gt; 54&lt;/div&gt;"
                                                        >
                                                            <div
                                                                className="progress-bar bg-purple"
                                                                role="progressbar"
                                                                aria-valuenow="73.46140163642832"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '73.46140163642832%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    73.46140163642832% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-teal"
                                                                role="progressbar"
                                                                aria-valuenow="8.217716115261473"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '8.217716115261473%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    8.217716115261473% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-red"
                                                                role="progressbar"
                                                                aria-valuenow="1.92102454642476"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '1.92102454642476%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    1.92102454642476% Complete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="list-group-item">
                                                    <div className="list-group-item-figure">
                                                        <a
                                                            href="user-profile.html"
                                                            className="user-avatar"
                                                            data-toggle="tooltip"
                                                            title="Tammy Beck"
                                                        >
                                                            <img src="/assets/images/avatars/uifaces16.jpg" alt="" />
                                                        </a>
                                                    </div>

                                                    <div className="list-group-item-body">
                                                        <div
                                                            className="progress bg-white rounded-0"
                                                            data-toggle="tooltip"
                                                            data-html="true"
                                                            title="&lt;div className=&quot;text-left small&quot;&gt;&lt;i className=&quot;fa fa-fw fa-circle text-purple&quot;&gt;&lt;/i&gt; 1432&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-teal&quot;&gt;&lt;/i&gt; 406&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-red&quot;&gt;&lt;/i&gt; 49&lt;/div&gt;"
                                                        >
                                                            <div
                                                                className="progress-bar bg-purple"
                                                                role="progressbar"
                                                                aria-valuenow="54.180855088914115"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '54.180855088914115%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    54.180855088914115% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-teal"
                                                                role="progressbar"
                                                                aria-valuenow="15.361331819901627"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '15.361331819901627%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    15.361331819901627% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-red"
                                                                role="progressbar"
                                                                aria-valuenow="1.853953840332955"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '1.853953840332955%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    1.853953840332955% Complete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="list-group-item">
                                                    <div className="list-group-item-figure">
                                                        <a
                                                            href="user-profile.html"
                                                            className="user-avatar"
                                                            data-toggle="tooltip"
                                                            title="Susan Kelley"
                                                        >
                                                            <img src="/assets/images/avatars/uifaces17.jpg" alt="" />
                                                        </a>
                                                    </div>

                                                    <div className="list-group-item-body">
                                                        <div
                                                            className="progress bg-white rounded-0"
                                                            data-toggle="tooltip"
                                                            data-html="true"
                                                            title="&lt;div className=&quot;text-left small&quot;&gt;&lt;i className=&quot;fa fa-fw fa-circle text-purple&quot;&gt;&lt;/i&gt; 1271&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-teal&quot;&gt;&lt;/i&gt; 87&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-red&quot;&gt;&lt;/i&gt; 82&lt;/div&gt;"
                                                        >
                                                            <div
                                                                className="progress-bar bg-purple"
                                                                role="progressbar"
                                                                aria-valuenow="52.13289581624282"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '52.13289581624282%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    52.13289581624282% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-teal"
                                                                role="progressbar"
                                                                aria-valuenow="3.568498769483183"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '3.568498769483183%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    3.568498769483183% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-red"
                                                                role="progressbar"
                                                                aria-valuenow="3.3634126333059884"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '3.3634126333059884%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    3.3634126333059884% Complete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="list-group-item">
                                                    <div className="list-group-item-figure">
                                                        <a
                                                            href="user-profile.html"
                                                            className="user-avatar"
                                                            data-toggle="tooltip"
                                                            title="Albert Newman"
                                                        >
                                                            <img src="/assets/images/avatars/uifaces18.jpg" alt="" />
                                                        </a>
                                                    </div>

                                                    <div className="list-group-item-body">
                                                        <div
                                                            className="progress bg-white rounded-0"
                                                            data-toggle="tooltip"
                                                            data-html="true"
                                                            title="&lt;div className=&quot;text-left small&quot;&gt;&lt;i className=&quot;fa fa-fw fa-circle text-purple&quot;&gt;&lt;/i&gt; 1527&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-teal&quot;&gt;&lt;/i&gt; 205&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-red&quot;&gt;&lt;/i&gt; 151&lt;/div&gt;"
                                                        >
                                                            <div
                                                                className="progress-bar bg-purple"
                                                                role="progressbar"
                                                                aria-valuenow="75.18463810930577"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '75.18463810930577%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    75.18463810930577% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-teal"
                                                                role="progressbar"
                                                                aria-valuenow="10.093549975381585"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '10.093549975381585%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    10.093549975381585% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-red"
                                                                role="progressbar"
                                                                aria-valuenow="7.434761201378631"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '7.434761201378631%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    7.434761201378631% Complete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="list-group-item">
                                                    <div className="list-group-item-figure">
                                                        <a
                                                            href="user-profile.html"
                                                            className="user-avatar"
                                                            data-toggle="tooltip"
                                                            title="Kyle Grant"
                                                        >
                                                            <img src="/assets/images/avatars/uifaces19.jpg" alt="" />
                                                        </a>
                                                    </div>

                                                    <div className="list-group-item-body">
                                                        <div
                                                            className="progress bg-white rounded-0"
                                                            data-toggle="tooltip"
                                                            data-html="true"
                                                            title="&lt;div className=&quot;text-left small&quot;&gt;&lt;i className=&quot;fa fa-fw fa-circle text-purple&quot;&gt;&lt;/i&gt; 643&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-teal&quot;&gt;&lt;/i&gt; 265&lt;br&gt;&lt;i className=&quot;fa fa-fw fa-circle text-red&quot;&gt;&lt;/i&gt; 127&lt;/div&gt;"
                                                        >
                                                            <div
                                                                className="progress-bar bg-purple"
                                                                role="progressbar"
                                                                aria-valuenow="36.89041881812966"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '36.89041881812966%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    36.89041881812966% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-teal"
                                                                role="progressbar"
                                                                aria-valuenow="15.203671830177854"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '15.203671830177854%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    15.203671830177854% Complete
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="progress-bar bg-red"
                                                                role="progressbar"
                                                                aria-valuenow="7.286288009179575"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{ width: '7.286288009179575%' }}
                                                            >
                                                                <span className="sr-only">
                                                                    7.286288009179575% Complete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                <div className="section-deck">
                                    <div className="card card-fluid">
                                        <header className="card-header"> Active Projects </header>

                                        <div className="lits-group list-group-flush">
                                            <div className="list-group-item">
                                                <div className="list-group-item-figure">
                                                    <div className="has-badge">
                                                        <a href="app-tasks.html" className="tile tile-md bg-blue">
                                                            LT
                                                        </a>
                                                        <a href="#team" className="user-avatar user-avatar-xs">
                                                            <img src="/assets/images/avatars/team1.jpg" alt="" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="list-group-item-body">
                                                    <h5 className="card-title mb-2">
                                                        <a href="app-tasks.html">Looper Admin Theme</a>
                                                    </h5>
                                                    <p className="card-subtitle text-muted">
                                                        Progress in 74% - Last update 1d
                                                    </p>

                                                    <div className="progress progress-xs bg-white">
                                                        <div
                                                            className="progress-bar bg-blue"
                                                            role="progressbar"
                                                            aria-valuenow="2181"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            style={{ width: '74%' }}
                                                        >
                                                            <span className="sr-only">74% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="list-group-item-figure">
                                                    <div className="has-badge">
                                                        <a href="app-tasks.html" className="tile tile-md bg-indigo">
                                                            SP
                                                        </a>
                                                        <a href="#team" className="user-avatar user-avatar-xs">
                                                            <img src="/assets/images/avatars/team1.jpg" alt="" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="list-group-item-body">
                                                    <h5 className="card-title mb-2">
                                                        <a href="app-tasks.html">Smart Paper</a>
                                                    </h5>
                                                    <p className="card-subtitle text-muted">
                                                        Progress in 22% - Last update 2h
                                                    </p>

                                                    <div className="progress progress-xs bg-white">
                                                        <div
                                                            className="progress-bar bg-indigo"
                                                            role="progressbar"
                                                            aria-valuenow="867"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            style={{ width: '22%' }}
                                                        >
                                                            <span className="sr-only">22% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="list-group-item-figure">
                                                    <div className="has-badge">
                                                        <a href="app-tasks.html" className="tile tile-md bg-yellow">
                                                            OS
                                                        </a>
                                                        <a href="#team" className="user-avatar user-avatar-xs">
                                                            <img src="/assets/images/avatars/team2.png" alt="" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="list-group-item-body">
                                                    <h5 className="card-title mb-2">
                                                        <a href="app-tasks.html">Online Store</a>
                                                    </h5>
                                                    <p className="card-subtitle text-muted">
                                                        Progress in 99% - Last update 2d
                                                    </p>

                                                    <div className="progress progress-xs bg-white">
                                                        <div
                                                            className="progress-bar bg-yellow"
                                                            role="progressbar"
                                                            aria-valuenow="6683"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            style={{ width: '99%' }}
                                                        >
                                                            <span className="sr-only">99% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="list-group-item-figure">
                                                    <div className="has-badge">
                                                        <a href="app-tasks.html" className="tile tile-md bg-purple">
                                                            BA
                                                        </a>
                                                        <a href="#team" className="user-avatar user-avatar-xs">
                                                            <img src="/assets/images/avatars/team3.png" alt="" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="list-group-item-body">
                                                    <h5 className="card-title mb-2">
                                                        <a href="app-tasks.html">Booking App</a>
                                                    </h5>
                                                    <p className="card-subtitle text-muted">
                                                        Progress in 35% - Last update 4h
                                                    </p>

                                                    <div className="progress progress-xs bg-white">
                                                        <div
                                                            className="progress-bar bg-purple"
                                                            role="progressbar"
                                                            aria-valuenow="112"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            style={{ width: '35%' }}
                                                        >
                                                            <span className="sr-only">35% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="list-group-item-figure">
                                                    <div className="has-badge">
                                                        <a href="app-tasks.html" className="tile tile-md bg-teal">
                                                            SB
                                                        </a>
                                                        <a href="#team" className="user-avatar user-avatar-xs">
                                                            <img src="/assets/images/avatars/team3.png" alt="" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="list-group-item-body">
                                                    <h5 className="card-title mb-2">
                                                        <a href="app-tasks.html">SVG Icon Bundle</a>
                                                    </h5>
                                                    <p className="card-subtitle text-muted">
                                                        Progress in 32% - Last update 1d
                                                    </p>

                                                    <div className="progress progress-xs bg-white">
                                                        <div
                                                            className="progress-bar bg-teal"
                                                            role="progressbar"
                                                            aria-valuenow="461"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            style={{ width: '32%' }}
                                                        >
                                                            <span className="sr-only">32% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="list-group-item-figure">
                                                    <div className="has-badge">
                                                        <a href="app-tasks.html" className="tile tile-md bg-pink">
                                                            SP
                                                        </a>
                                                        <a href="#team" className="user-avatar user-avatar-xs">
                                                            <img src="/assets/images/avatars/team1.jpg" alt="" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="list-group-item-body">
                                                    <h5 className="card-title mb-2">
                                                        <a href="app-tasks.html">Syrena Project</a>
                                                    </h5>
                                                    <p className="card-subtitle text-muted">
                                                        Progress in 93% - Last update 8h
                                                    </p>

                                                    <div className="progress progress-xs bg-white">
                                                        <div
                                                            className="progress-bar bg-pink"
                                                            role="progressbar"
                                                            aria-valuenow="3981"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            style={{ width: '93%' }}
                                                        >
                                                            <span className="sr-only">93% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card card-fluid">
                                        <header className="card-header"> Active Tasks:To-Dos </header>

                                        <div className="card-body">
                                            <div className="todo-list">
                                                <div className="todo-header">Looper Admin Theme (1/3)</div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo1"
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo1">
                                                            Eat corn on the cob
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo2"
                                                            checked
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo2">
                                                            Mix up a pitcher of sangria
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo3"
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo3">
                                                            Have a barbecue
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo4"
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo4">
                                                            Ride a roller coaster —
                                                            <span className="text-red small">Overdue in 3 days</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="todo-header">Smart Paper (0/2)</div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo5"
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo5">
                                                            Bring a blanket and lie on the grass at an outdoor concert
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo6"
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo6">
                                                            Collect seashells at the beach
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="todo">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="todo7"
                                                        />
                                                        <label className="custom-control-label" htmlFor="todo7">
                                                            Swim in a lake
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <footer className="card-footer">
                                            <a href="#" className="card-footer-item">
                                                View all <i className="fa fa-fw fa-angle-right" />
                                            </a>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="auth-footer">
                    © 2018 All Rights Reserved. <a href="#">Privacy</a> and <a href="#">Terms</a>
                    <p id="applicationVersion" />
                </footer>
            </main>
        );
    }
}

Dashboard.propTypes = {
    account: PropTypes.any
};

const mapProps = state => ({
    account: _.get(state, `${Reducers.login.STATE_PATH}.account`)
});

export default connect(mapProps)(Dashboard);
