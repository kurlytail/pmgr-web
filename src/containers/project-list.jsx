import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import DocumentReducer from '../reducers/project';
import uuid from 'uuid/v4';
import Factory from '../managers';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ProjectList extends Component {
    render() {
        const managerOptions = _.map(Factory.getAllManagers(), value => {
            return { value: value, label: _.startCase(value) };
        });
        const projectTypeOptions = _.map(this.props.types, (value, key) => {
            return { value: key, label: value.name };
        });
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>ID</th>
                        <th>Manager</th>
                        <th />
                        <th>Type</th>
                        <th>Summary</th>
                        <th>
                            <button className="btn" onClick={this.props.create}>
                                <i className="fa fa-plus" />
                            </button>
                            <button className="btn" onClick={this.props.gc}>
                                <i className="fa fa-trash" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {_.map(_.omitBy(this.props.projects, project => project.deleted), (meta, uuid) => (
                        <tr key={uuid} scope="row">
                            <td>
                                <InlineEdit
                                    text={this.props.projects[uuid].name}
                                    paramName="name"
                                    change={data => this.props.configure(uuid, data)}
                                />
                            </td>
                            <td>
                                <a href={'/#/project/' + uuid}>{uuid}</a>
                            </td>
                            <td>
                                <Select
                                    name="manager"
                                    options={managerOptions}
                                    clearable={false}
                                    value={this.props.projects[uuid].manager}
                                    simpleValue
                                    searchable={false}
                                    onChange={newValue => this.props.configure(uuid, { manager: newValue })}
                                />
                            </td>
                            <td>{Factory.newManager(this.props.projects[uuid].manager).avatar(40)}</td>
                            <td>
                                <Select
                                    name="type"
                                    options={projectTypeOptions}
                                    clearable={false}
                                    value={this.props.projects[uuid].type}
                                    simpleValue
                                    searchable={false}
                                    onChange={newValue => this.props.configure(uuid, { type: newValue })}
                                />
                            </td>
                            <td>
                                <InlineEdit
                                    placeholder="Add summary"
                                    text={this.props.projects[uuid].summary ? this.props.projects[uuid].summary : ''}
                                    paramName="summary"
                                    change={data => this.props.configure(uuid, data)}
                                />
                            </td>
                            <td>
                                <a onClick={() => this.props.del(uuid)}>
                                    <i className="fa fa-trash" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

const mapProps = state => {
    return {
        projects: state.app.local.projects,
        types: state.app.local.projectTypes
    };
};

const mapDispatch = dispatch => {
    return {
        create: () => {
            dispatch(ProjectListReducer.projectCreate(uuid()));
        },
        gc: () => {
            dispatch(ProjectListReducer.projectGarbageCollect());
        },
        del: uuid => {
            dispatch(ProjectListReducer.projectDelete(uuid));
        },
        configure: (uuid, data) => {
            dispatch(ProjectListReducer.projectConfigure(uuid, data));
        }
    };
};

const projectList = connect(mapProps, mapDispatch)(ProjectList);
export default projectList;
