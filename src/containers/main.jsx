import React, { Component } from 'react';
import Project from './project.jsx';
import ProjectList from './project-list.jsx';
import ProjectType from './project-type.jsx';
import ProjectTypeList from './project-type-list.jsx';
import Dashboard from './dashboard.jsx';
import Document from './document.jsx';
import Tool from './tool.jsx';
import Activity from './activity.jsx';
import { Route } from 'react-router-dom';
import FileDownload from 'react-file-download';
import ReactFileReader from 'react-file-reader';
import { StoreInfo } from '../store';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }
    saveConfiguration() {
        const csv = localStorage['pmgr'];
        FileDownload(csv, 'pmgr.json');
    }

    handleConfigUpload(data) {
        let configFile = data.fileList[0];
        let reader = new FileReader();
        reader.onload = e => {
            let config = JSON.parse(e.target.result);
            localStorage.setItem('pmgr', config);
            location.reload();
        };
        reader.readAsText(configFile);
    }

    render() {
        return (
            <div className="app has-fullwidth">
                <header className="app-header">
                    <div className="top-bar">
                        <div className="top-bar-list">
                            <div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">
                                <ul className="header-nav nav">
                                    <li className="nav-item dropdown header-nav-dropdown">
                                        <a
                                            className="nav-link"
                                            href="#"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <span className="oi oi-grid-three-up" />
                                        </a>
                                        <div className="dropdown-arrow" />

                                        <div className="dropdown-menu dropdown-menu-rich dropdown-menu-right">
                                            <div className="dropdown-sheets">
                                                <div className="dropdown-sheet-item">
                                                    <a href="#" className="tile-wrapper">
                                                        <span className="tile tile-lg bg-indigo">
                                                            <i className="oi oi-dashboard" />
                                                        </span>
                                                        <span className="tile-peek">Dashboard</span>
                                                    </a>
                                                </div>

                                                <div className="dropdown-sheet-item">
                                                    <a href="#/project" className="tile-wrapper">
                                                        <span className="tile tile-lg bg-teal">
                                                            <i className="oi oi-fork" />
                                                        </span>
                                                        <span className="tile-peek">Projects</span>
                                                    </a>
                                                </div>

                                                <div className="dropdown-sheet-item">
                                                    <a href="#/project-type" className="tile-wrapper">
                                                        <span className="tile tile-lg bg-pink">
                                                            <i className="fa fa-tasks" />
                                                        </span>
                                                        <span className="tile-peek">Project types</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="app-main">
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/project" exact component={ProjectList} />
                    <Route path="/project/:uuid" component={Project} />
                    <Route path="/project-type" exact component={ProjectTypeList} />
                    <Route path="/project-type/:uuid" component={ProjectType} />
                    <Route path="/document/:project/:document" component={Document} />
                    <Route path="/tool/:project/:tool" component={Tool} />
                    <Route path="/activity/:project/:activity" component={Activity} />
                </main>
            </div>
        );
    }
}

export default MainContainer;
