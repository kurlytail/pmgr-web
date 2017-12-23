import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import uuid from 'uuid/v4';

class ProjectList extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>ID</th>
                                <th>Manager</th>
                                <th>Summary</th>
                                <th>
                                    <div className="btn-group">
                                        <a onClick={this.props.gc}>
                                            <i className="fa fa-trash" />
                                        </a>
                                        <a onClick={this.props.create} style={{ paddingLeft: '30px' }}>
                                            <i className="fa fa-plus" />
                                        </a>
                                    </div>
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
                                    <td>{this.props.projects[uuid].manager}</td>
                                    <td>
                                        <InlineEdit
                                            placeholder="Add summary"
                                            text={
                                                this.props.projects[uuid].summary
                                                    ? this.props.projects[uuid].summary
                                                    : ''
                                            }
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
                </div>
            </div>
        );
    }
}

const mapProps = state => {
    return {
        projects: state.app.local.projects
    };
};

const mapDispatch = dispatch => {
    return {
        create: () => {
            dispatch(ProjectListReducer.projectCreate(uuid()));
        },
        del: uuid => {
            dispatch(ProjectListReducer.projectDelete(uuid));
        },
        gc: uuid => {
            dispatch(ProjectListReducer.projectGarbageCollect(uuid));
        },
        configure: (uuid, data) => {
            dispatch(ProjectListReducer.projectConfigure(uuid, data));
        }
    };
};

const projectList = connect(mapProps, mapDispatch)(ProjectList);
export default projectList;
