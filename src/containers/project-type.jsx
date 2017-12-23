import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectTypeListReducer from '../reducers/project-type';
import uuid from 'uuid/v4';

class ProjectType extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <div className="card-header">
                        <a className="btn btn-primary float-right" href="/#/">
                            <i className="fa fa-reply" />
                        </a>
                    </div>
                    <h1 className="card-title">
                        <InlineEdit
                            text={this.props.projectType.name}
                            paramName="name"
                            change={data => this.props.configure(data)}
                        />
                    </h1>

                    <h3>{this.props.match.params.uuid}</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <InlineEdit
                                        placeholder="Add summary"
                                        text={this.props.projectType.summary ? this.props.projectType.summary : ''}
                                        paramName="summary"
                                        change={data => this.props.configure(data)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InlineEdit
                                        placeholder="Add description"
                                        text={
                                            this.props.projectType.description ? this.props.projectType.description : ''
                                        }
                                        paramName="description"
                                        change={data => this.props.configure(data)}
                                        editingElement="textarea"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <tbody />
                    </table>
                </div>
            </div>
        );
    }
}

const mapProps = (state, props) => {
    return {
        projectType: _.get(state, `app.local.projectTypes.${props.match.params.uuid}`)
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        del: () => {
            dispatch(ProjectTypeListReducer.projectTypeDelete(props.match.params.uuid));
        },
        configure: (...params) => {
            dispatch(ProjectTypeListReducer.projectTypeConfigure(props.match.params.uuid, ...params));
        }
    };
};

const projectType = connect(mapProps, mapDispatch)(ProjectType);
export default projectType;
