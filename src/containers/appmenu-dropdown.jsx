import React, { Component } from 'react';

class AppMenu extends Component {
    render() {
        return (
            <li className="nav-item dropdown header-nav-dropdown">
                <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {' '}
                    <span className="oi oi-grid-three-up" />
                </a>
                <div className="dropdown-arrow" />
                <div className="dropdown-menu dropdown-menu-rich dropdown-menu-right">
                    <div className="dropdown-sheets">
                        <div className="dropdown-sheet-item">
                            <a href="#" className="tile-wrapper">
                                {' '}
                                <span className="tile tile-lg bg-indigo">
                                    {' '}
                                    <i className="oi oi-people" />
                                </span>{' '}
                                <span className="tile-peek">Teams</span>
                            </a>
                        </div>

                        <div className="dropdown-sheet-item">
                            <a href="#" className="tile-wrapper">
                                {' '}
                                <span className="tile tile-lg bg-teal">
                                    {' '}
                                    <i className="oi oi-fork" />
                                </span>{' '}
                                <span className="tile-peek">Projects</span>
                            </a>
                        </div>

                        <div className="dropdown-sheet-item">
                            <a href="#" className="tile-wrapper">
                                {' '}
                                <span className="tile tile-lg bg-pink">
                                    {' '}
                                    <i className="fa fa-tasks" />
                                </span>{' '}
                                <span className="tile-peek">Tasks</span>
                            </a>
                        </div>

                        <div className="dropdown-sheet-item">
                            <a href="#" className="tile-wrapper">
                                {' '}
                                <span className="tile tile-lg bg-yellow">
                                    {' '}
                                    <i className="oi oi-fire" />
                                </span>{' '}
                                <span className="tile-peek">Feeds</span>
                            </a>
                        </div>

                        <div className="dropdown-sheet-item">
                            <a href="#" className="tile-wrapper">
                                {' '}
                                <span className="tile tile-lg bg-cyan">
                                    {' '}
                                    <i className="oi oi-document" />
                                </span>{' '}
                                <span className="tile-peek">Files</span>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default AppMenu;
