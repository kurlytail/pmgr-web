import React, { Component } from 'react';

class ActivitiesDropdown extends Component {
    render() {
        return (
            <li className="nav-item dropdown header-nav-dropdown has-notified">
                <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="oi oi-pulse" />
                </a>
                <div className="dropdown-arrow" />
                <div className="dropdown-menu dropdown-menu-rich dropdown-menu-right">
                    <h6 className="dropdown-header stop-propagation">
                        <span>
                            Activities <span className="badge">(2)</span>
                        </span>
                    </h6>

                    <div className="dropdown-scroll has-scrollable">
                        <a href="#" className="dropdown-item unread">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces15.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Jeffrey Wells created a schedule</p>
                                <span className="date">Just now</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item unread">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces16.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Anna Vargas logged a chat</p>
                                <span className="date">3 hours ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces17.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Sara Carr invited to Stilearn Admin</p>
                                <span className="date">5 hours ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces18.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Sara Carr updated a project</p>
                                <span className="date">1 day ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces19.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Arthur Carroll created a task</p>
                                <span className="date">1 day ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces20.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Angela Peterson assign a task to you</p>
                                <span className="date">2 days ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/uifaces21.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="text">Willie Dixon and 3 others followed you</p>
                                <span className="date">2 days ago</span>
                            </div>
                        </a>
                    </div>

                    <a href="user-activities.html" className="dropdown-footer">
                        All activities <i className="fa fa-fw fa-long-arrow-alt-right" />
                    </a>
                </div>
            </li>
        );
    }
}

export default ActivitiesDropdown;
