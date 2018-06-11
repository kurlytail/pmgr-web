import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import uuid from 'uuid/v4';
import Factory from '../managers';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DocumentListItem from './document-list-item.jsx';
import ActivityListItem from './activity-list-item.jsx';

class Project extends Component {
    render() {
        const managerOptions = _.map(Factory.getAllManagers(), value => {
            return { value: value, label: _.startCase(value) };
        });
        /* Retrieve the manager for this project */
        const manager = Factory.newManager(this.props.project.manager, this.props.match.params.uuid);
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <h1 className="text-muted">Project</h1>
                            <h1 className="card-title">
                                <InlineEdit
                                    text={this.props.project.name}
                                    paramName="name"
                                    change={data => this.props.configure(data)}
                                    className="h1"
                                    activeClassName="h1"
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </h1>
                            <h3>{this.props.match.params.uuid}</h3>
                            <InlineEdit
                                placeholder="Add summary"
                                text={this.props.project.summary || ''}
                                paramName="summary"
                                change={data => this.props.configure(data)}
                                style={{
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="col col-xs-2 col-sm-2 col-md-2 col-lg-2">
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
                    <InlineEdit
                        placeholder="Add description"
                        text={this.props.project.description || ''}
                        paramName="description"
                        change={data => this.props.configure(data)}
                        editingElement="textarea"
                        style={{
                            width: '100%'
                        }}
                    />
                </div>
                <div>{manager.config(this.props.project)}</div>

                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Completed activities</h4>
                            </div>
                            <ul className="list-group">
                                {_.map(
                                    _.pickBy(this.props.activities, activity => activity.complete),
                                    (activity, key) => (
                                        <ActivityListItem
                                            project={this.props.match.params.uuid}
                                            activity={key}
                                            key={key}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Activities in progress</h4>
                            </div>
                            <ul className="list-group">
                                {_.map(
                                    _.pickBy(this.props.activities, activity => !activity.complete && activity.started),
                                    (activity, key) => (
                                        <ActivityListItem
                                            project={this.props.match.params.uuid}
                                            activity={key}
                                            key={key}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Activities to be started</h4>
                            </div>
                            <ul className="list-group">
                                {_.map(
                                    _.pickBy(
                                        this.props.activities,
                                        activity => !activity.started && !activity.complete
                                    ),
                                    (activity, key) => (
                                        <ActivityListItem
                                            project={this.props.match.params.uuid}
                                            activity={key}
                                            key={key}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Completed documents</h4>
                            </div>
                            <ul className="list-group">
                                {_.map(_.pickBy(this.props.documents, doc => doc.complete), (doc, key) => (
                                    <DocumentListItem project={this.props.match.params.uuid} document={key} key={key} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Documents being processed</h4>
                            </div>
                            <ul className="list-group">
                                {_.map(
                                    _.pickBy(this.props.documents, doc => !doc.complete && doc.started),
                                    (doc, key) => (
                                        <DocumentListItem
                                            project={this.props.match.params.uuid}
                                            document={key}
                                            key={key}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Documents to be started</h4>
                            </div>
                            <ul className="list-group">
                                {_.map(
                                    _.pickBy(this.props.documents, doc => !doc.started && !doc.complete),
                                    (doc, key) => (
                                        <DocumentListItem
                                            project={this.props.match.params.uuid}
                                            document={key}
                                            key={key}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapProps = (state, props) => {
    return {
        project: state.app.local.projects[props.match.params.uuid],
        documents: state.app.local.documents[props.match.params.uuid],
        activities: state.app.local.activities[props.match.params.uuid]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        del: () => {
            dispatch(ProjectListReducer.projectDelete(props.match.params.uuid));
        },
        configure: (...params) => {
            dispatch(ProjectListReducer.projectConfigure(props.match.params.uuid, ...params));
        }
    };
};

const project = connect(mapProps, mapDispatch)(Project);
export default project;
