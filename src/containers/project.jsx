import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import uuid from 'uuid/v4';
import Factory from '../managers';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Project extends Component {
    render() {
        const managerOptions = _.map(Factory.getAllManagers(), value => {
            return { value: value, label: _.startCase(value) };
        });
        /* Retrieve the manager for this project */
        const manager = Factory.newManager(this.props.project.manager, this.props.match.params.uuid);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <h1 className="panel-title">
                                <InlineEdit
                                    text={this.props.project.name}
                                    paramName="name"
                                    change={data => this.props.configure(data)}
                                    className="h1"
                                    activeClassName="h1"
                                />
                            </h1>
                            <h3>{this.props.match.params.uuid}</h3>
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
                <div className="panel-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <InlineEdit
                                        placeholder="Add summary"
                                        text={this.props.project.summary ? this.props.project.summary : ''}
                                        paramName="summary"
                                        change={data => this.props.configure(data)}
                                    />
                                </td>
                            </tr>
                            <tr />
                            <tr>
                                <td>
                                    <InlineEdit
                                        placeholder="Add description"
                                        text={this.props.project.description ? this.props.project.description : ''}
                                        paramName="description"
                                        change={data => this.props.configure(data)}
                                        editingElement="textarea"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>{manager.config(this.props.project)}</div>
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#processing">
                                    Documents being processed
                                </a>
                            </h4>
                        </div>
                        <div id="processing" className="panel-collapse">
                            <div className="panel-body">
                                <ul className="list-group">
                                    {_.map(_.pickBy(this.props.documents, doc => doc.complete !== 100), (doc, key) => (
                                        <li className="list-group-item" key={key}>
                                            {doc.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#completed">
                                    Completed documents
                                </a>
                            </h4>
                        </div>
                        <div id="completed" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul className="list-group">
                                    {_.map(_.pickBy(this.props.documents, doc => doc.complete === 100), (doc, key) => (
                                        <li className="list-group-item" key={key}>
                                            {doc.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#waiting">
                                    Documents to be started
                                </a>
                            </h4>
                        </div>
                        <div id="waiting" className="panel-collapse collapse">
                            <div className="panel-body" />
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
        documents: state.app.local.documents[props.match.params.uuid]
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
