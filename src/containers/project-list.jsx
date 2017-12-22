import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project-list';
import uuid from 'uuid/v4';

class ProjectList extends Component {
    render() {
        return (
            <div className="uk-panel">
                <table className="uk-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>UUID</th>
                            <th>
                                <button className="uk-button uk-button-large" onClick={this.props.create}>
                                    +
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(_.omitBy(this.props.projects, project => project.deleted), (meta, uuid) => (
                            <tr key={uuid}>
                                <td>{this.props.app[uuid] ? this.props.app[uuid].name : 'Unkown'}</td>
                                <td>{uuid}</td>
                                <td>
                                    <button className="uk-button uk-button" onClick={() => this.props.del(uuid)}>
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
        projects: state.app.local.projects,
        app: state.app.local
    };
};

const mapDispatch = dispatch => {
    return {
        create: () => {
            dispatch(ProjectListReducer.projectCreate(uuid()));
        },
        del: uuid => {
            dispatch(ProjectListReducer.projectDelete(uuid));
        }
    };
};

const projectList = connect(mapProps, mapDispatch)(ProjectList);
export default projectList;
