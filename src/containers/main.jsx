import React, { Component } from 'react';
import Project from './project.jsx';
import ProjectList from './project-list.jsx';
import ProjectType from './project-type.jsx';
import ProjectTypeList from './project-type-list.jsx';
import { Route } from 'react-router-dom';
import FileDownload from 'react-file-download';
import ReactFileReader from 'react-file-reader';

class MainContainer extends Component {
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
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <a href="#">
                                    Projects <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li>
                                <a href="#/project-type">Project Types
                                <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav pull-right">
                            <li>
                                <button className="btn" onClick={this.saveConfiguration}>
                                    <i className="fa fa-floppy-o" />
                                </button>
                            </li>
                            <li>
                                <button className="btn">
                                    <ReactFileReader
                                        fileTypes={['.json']}
                                        base64={true}
                                        multipleFiles={false}
                                        handleFiles={this.handleConfigUpload}
                                    >
                                        <i className="fa fa-folder-open" />
                                    </ReactFileReader>
                                </button>
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
