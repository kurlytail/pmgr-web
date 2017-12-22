import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import uuid from 'uuid/v4';

class ProjectList extends Component {
    render() {
        return (
            <div className="uk-panel">
                <table className="uk-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>ID</th>
                            <th>
                                <div className="uk-button-group">
                                    <button className="uk-button uk-button-large" onClick={this.props.create}>
                                        +
                                    </button>
                                    <button className="uk-button uk-button-large" onClick={this.props.gc}>
                                        X
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(_.omitBy(this.props.projects, project => project.deleted), (meta, uuid) => (
                            <tr key={uuid}>
                                <td>
                                    <InlineEdit
                                        text={this.props.projects[uuid].name}
                                        paramName="name"
                                        change={data => this.props.rename(uuid, data.name)}
                                    />
                                </td>
                                <td>
                                    <a href={'/#/projects/' + uuid}>{uuid}</a>
                                </td>
                                <td>
                                    <button className="uk-button" onClick={() => this.props.del(uuid)}>
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        rename: (uuid, name) => {
            dispatch(ProjectListReducer.projectRename(uuid, name));
        }
    };
};

const projectList = connect(mapProps, mapDispatch)(ProjectList);
export default projectList;
