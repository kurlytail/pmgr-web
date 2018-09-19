import React, { Component } from 'react';

class MessagesDropdown extends Component {
    render() {
        return (
            <li className="nav-item dropdown header-nav-dropdown has-notified">
                <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="oi oi-envelope-open" />
                </a>
                <div className="dropdown-arrow" />
                <div className="dropdown-menu dropdown-menu-rich dropdown-menu-right">
                    <h6 className="dropdown-header stop-propagation">
                        <span>Messages</span> <a href="#">Mark all as read</a>
                    </h6>

                    <div className="dropdown-scroll has-scrollable">
                        <a href="#" className="dropdown-item unread">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/team1.jpg" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="subject">Stilearning</p>
                                <p className="text text-truncate">{"Invitation: Joe's Dinner @ Fri Aug 22"}</p>
                                <span className="date">2 hours ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/team3.png" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="subject">Openlane</p>
                                <p className="text text-truncate">Final reminder: Upgrade to Pro</p>
                                <span className="date">23 hours ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="tile tile-circle bg-green">GZ</div>
                            <div className="dropdown-item-body">
                                <p className="subject">Gogo Zoom</p>
                                <p className="text text-truncate">Live healthy with this wireless sensor.</p>
                                <span className="date">1 day ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="tile tile-circle bg-teal">GD</div>
                            <div className="dropdown-item-body">
                                <p className="subject">Gold Dex</p>
                                <p className="text text-truncate">Invitation: Design Review @ Mon Jul 7</p>
                                <span className="date">1 day ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="user-avatar">
                                <img src="/assets/images/avatars/team2.png" alt="" />
                            </div>
                            <div className="dropdown-item-body">
                                <p className="subject">Creative Division</p>
                                <p className="text text-truncate">Need some feedback on this please</p>
                                <span className="date">2 days ago</span>
                            </div>
                        </a>

                        <a href="#" className="dropdown-item">
                            <div className="tile tile-circle bg-pink">LD</div>
                            <div className="dropdown-item-body">
                                <p className="subject">Lab Drill</p>
                                <p className="text text-truncate">Our UX exercise is ready</p>
                                <span className="date">6 days ago</span>
                            </div>
                        </a>
                    </div>

                    <a href="app-messages.html" className="dropdown-footer">
                        All messages <i className="fa fa-fw fa-long-arrow-alt-right" />
                    </a>
                </div>
            </li>
        );
    }
}

export default MessagesDropdown;
