import React, { Component } from 'react';
import Project from './project.jsx';
import ProjectList from './project-list.jsx';
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
                <header>
                    <div className="btn-group align-right" role="group">
                        <button className="btn" onClick={this.saveConfiguration}>
                            <i className="fa fa-floppy-o" style={{ fontSize: '24px' }} />
                        </button>
                        <ReactFileReader
                            fileTypes={['.json']}
                            base64={true}
                            multipleFiles={false}
                            handleFiles={this.handleConfigUpload}
                        >
                            <button className="btn">
                                <i className="fa fa-folder-open" style={{ fontSize: '24px' }} />
                            </button>
                        </ReactFileReader>
                    </div>
                </header>
                <main>
                    <Route path="/" exact component={ProjectList} />
                    <Route path="/project/:uuid" component={Project} />
                </main>
            </div>
        );
    }
}

export default MainContainer;
