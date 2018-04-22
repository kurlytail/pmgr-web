import React, { Component } from 'react';
import Project from './project.jsx';
import ProjectList from './project-list.jsx';
import ProjectType from './project-type.jsx';
import ProjectTypeList from './project-type-list.jsx';
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
        $(document).ready(function() {
            // -----------------------------------------------------------------------
            $.each($('nav').find('li'), function() {
                $(this).toggleClass(
                    'active',
                    window.location.hash ===
                        $(this)
                            .find('a')
                            .attr('href')
                );
            });
            // -----------------------------------------------------------------------
        });
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default">
                    <div className="navbar-collapse collapse" id="navbarNavDropdown">
                        <ul className="nav navbar-nav navbar-left">
                            <li className="nav-item" name="back" onClick={StoreInfo.history.goBack} />
                            <li className="nav-item">
                                <a className="nav-link" href="#/">
                                    Projects
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/project-type">
                                    Project Types
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.saveConfiguration}>
                                    <i className="fa fa-floppy-o" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <ReactFileReader
                                        fileTypes={['.json']}
                                        base64={true}
                                        multipleFiles={false}
                                        handleFiles={this.handleConfigUpload}
                                    >
                                        <i className="fa fa-folder-open" />
                                    </ReactFileReader>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main>
                    <Route path="/" exact component={ProjectList} />
                    <Route path="/project/:uuid" component={Project} />
                    <Route path="/project-type" exact component={ProjectTypeList} />
                    <Route path="/project-type/:uuid" component={ProjectType} />
                </main>
            </div>
        );
    }
}

export default MainContainer;
