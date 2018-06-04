import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentReducer from '../reducers/document';
import Factory from '../managers';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';
import Select from 'react-select';
import Elaborate from '../elaborate';
import ToolListItem from './tool-list-item.jsx';
import ActivityListItem from './activity-list-item.jsx';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class Document extends Component {
    render() {
        const documentId = this.props.match.params.document;
        const managerName = this.props.document.manager || this.props.project.manager;
        const managerOptions = _.map(Factory.getAllManagers(), value => {
            return { value: value, label: _.startCase(value) };
        });
        const manager = Factory.newManager(managerName, this.props.match.params.project);

        const toolsModifyingDocument = Elaborate.getToolsModifyingDocument(documentId);
        const toolsUsingDocument = Elaborate.getToolsUsingDocument(documentId);
        const activitiesModifyingDocument = Elaborate.getActivitiesModifyingDocument(documentId);
        const activitiesUsingDocument = Elaborate.getActivitiesUsingDocument(documentId);

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-10">
                            <h6 className="text-muted">Document</h6>
                            <h1 className="card-title">{this.props.document.name}</h1>
                            <h3>
                                Project{' '}
                                <a href={`#/project/${this.props.match.params.project}`}>{this.props.project.name}</a>
                            </h3>
                            <InlineEdit
                                placeholder="Add summary"
                                text={this.props.document.summary || ''}
                                paramName="summary"
                                change={data => this.props.configure(data)}
                                style={{
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="col col-2">
                            <div className="pull-right">{manager.avatar()}</div>
                            <h3>
                                <Select
                                    name="manager"
                                    options={managerOptions}
                                    clearable={false}
                                    value={this.props.project.manager}
                                    simpleValue
                                    searchable={false}
                                    onChange={newValue => this.props.configure({ manager: newValue })}
                                />
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <InlineEdit
                                placeholder="Add description"
                                text={this.props.document.description || ''}
                                paramName="description"
                                change={data => this.props.configure(data)}
                                editingElement="textarea"
                                style={{
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">{this.props.document.progress || 0}%</div>
                                            <div className="col">
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    value={this.props.document.progress || 0}
                                                    onChange={newValue => this.props.configure({ progress: newValue })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card-body">
                                        {this.props.document.complete
                                            ? 'Completed'
                                            : this.props.document.started ? 'In progress' : 'Not started'}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-body float-right">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    this.props.configure({ complete: false, started: false })
                                                }
                                            >
                                                Reset
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => this.props.configure({ complete: false, started: true })}
                                            >
                                                Start
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => this.props.configure({ complete: true, started: false })}
                                            >
                                                Complete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Modified by tools</h4>
                                </div>
                                <ul className="list-group">
                                    {toolsModifyingDocument.map(tool => (
                                        <ToolListItem
                                            project={this.props.match.params.project}
                                            tool={tool}
                                            key={tool}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Used by tools</h4>
                                </div>
                                <ul className="list-group">
                                    {toolsUsingDocument.map(tool => (
                                        <ToolListItem
                                            project={this.props.match.params.project}
                                            tool={tool}
                                            key={tool}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Modified by activities</h4>
                                </div>
                                <ul className="list-group">
                                    {activitiesModifyingDocument.map(activity => (
                                        <ActivityListItem
                                            project={this.props.match.params.project}
                                            activity={activity}
                                            key={activity}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Used by activities</h4>
                                </div>
                                <ul className="list-group">
                                    {activitiesUsingDocument.map(activity => (
                                        <ActivityListItem
                                            project={this.props.match.params.project}
                                            activity={activity}
                                            key={activity}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Related Process Groups</h4>
                                </div>
                                <ul className="list-group" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Related Processes</h4>
                                </div>
                                <ul className="list-group" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapProps = (state, props) => {
    return {
        project: state.app.local.projects[props.match.params.project],
        document: state.app.local.documents[props.match.params.project][props.match.params.document]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        configure: (...params) => {
            dispatch(
                DocumentReducer.documentConfigure(props.match.params.project, props.match.params.document, ...params)
            );
        }
    };
};

const doc = connect(mapProps, mapDispatch)(Document);
export default doc;
