import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import uuid from 'uuid/v4';

class Project extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <div className="card-header">
                        <a className="btn btn-primary float-right" href="/#/">
                            <i className="fa fa-reply" style={{ fontSize: '24px' }} />
                        </a>
                    </div>
                    <h1 className="card-title">
                        <InlineEdit
                            text={this.props.project.name}
                            paramName="name"
                            change={data => this.props.configure(data)}
                        />
                    </h1>

                    <h3>{this.props.match.params.uuid}</h3>
                    <h2>Manager: {this.props.project.manager}</h2>
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
            </div>
        );
    }
}

const mapProps = (state, props) => {
    return {
        project: state.app.local.projects[props.match.params.uuid]
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
