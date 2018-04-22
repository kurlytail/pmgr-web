import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectTypeListReducer from '../reducers/project-type';
import uuid from 'uuid/v4';

class ProjectTypeList extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Project Type</th>
                                <th>ID</th>
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
                            {_.map(_.omitBy(this.props.projectTypes, project => project.deleted), (meta, uuid) => (
                                <tr key={uuid} scope="row">
                                    <td>
                                        <InlineEdit
                                            text={this.props.projectTypes[uuid].name}
                                            paramName="name"
                                            change={data => this.props.configure(uuid, data)}
                                        />
                                    </td>
                                    <td>
                                        <a href={'/#/project-type/' + uuid}>{uuid}</a>
                                    </td>
                                    <td>
                                        <InlineEdit
                                            placeholder="Add summary"
                                            text={
                                                this.props.projectTypes[uuid].summary
                                                    ? this.props.projectTypes[uuid].summary
                                                    : ''
                                            }
                                            paramName="summary"
                                            change={data => this.props.configure(uuid, data)}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => this.props.del(uuid)}>
                                            <i className="fa fa-trash" />
                                        </button>
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
        projectTypes: _.get(state, 'app.local.projectTypes')
    };
};

const mapDispatch = dispatch => {
    return {
        create: () => {
            dispatch(ProjectTypeListReducer.projectTypeCreate(uuid()));
        },
        del: uuid => {
            dispatch(ProjectTypeListReducer.projectTypeDelete(uuid));
        },
        gc: uuid => {
            dispatch(ProjectTypeListReducer.projectTypeGarbageCollect(uuid));
        },
        configure: (uuid, data) => {
            dispatch(ProjectTypeListReducer.projectTypeConfigure(uuid, data));
        }
    };
};

const projectTypeList = connect(mapProps, mapDispatch)(ProjectTypeList);
export default projectTypeList;
