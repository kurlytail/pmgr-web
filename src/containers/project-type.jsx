import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectTypeListReducer from '../reducers/project-type';
import uuid from 'uuid/v4';
import Select from 'react-select';
import { getAllActivities } from '../activities';
import { getAllTools } from '../tools';
import 'react-select/dist/react-select.css';

class ProjectType extends Component {
    render() {
        const activityOptions = _.map(getAllActivities(), value => {
            return { value: value, label: _.startCase(value) };
        });
        const toolOptions = _.map(getAllTools(), value => {
            return { value: value, label: _.startCase(value) };
        });
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1 className="panel-title">
                        <InlineEdit
                            text={this.props.projectType.name}
                            paramName="name"
                            change={data => this.props.configure(data)}
                            className="h1"
                            activeClassName="h1"
                        />
                    </h1>

                    <h3>{this.props.match.params.uuid}</h3>
                </div>
                <div className="panel-body">
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
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Activity Name</th>
                                            <th>Activity Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_.map(this.props.projectType.activities, (type, name) => {
                                            return (
                                                <tr key={name}>
                                                    <td>{_.startCase(name)}</td>
                                                    <td>
                                                        <Select
                                                            name="activity"
                                                            options={activityOptions}
                                                            clearable={false}
                                                            value={type}
                                                            simpleValue
                                                            searchable={false}
                                                            onChange={newValue =>
                                                                this.props.setActivity(name, newValue)
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tool Name</th>
                                            <th>Tool Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_.map(this.props.projectType.tools, (type, name) => {
                                            var displayName = name.replace(/^tool/, '');
                                            return (
                                                <tr key={name}>
                                                    <td>{_.startCase(displayName)}</td>
                                                    <td>
                                                        <Select
                                                            name="tool"
                                                            options={toolOptions}
                                                            clearable={false}
                                                            value={type}
                                                            simpleValue
                                                            searchable={false}
                                                            onChange={newValue => this.props.setTool(name, newValue)}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
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
        },
        setTool: (toolName, toolType) => {
            dispatch(ProjectTypeListReducer.projectTypeSetTool(props.match.params.uuid, toolName, toolType));
        },
        setActivity: (activityName, activityType) => {
            dispatch(
                ProjectTypeListReducer.projectTypeSetActivity(props.match.params.uuid, activityName, activityType)
            );
        }
    };
};

const projectType = connect(mapProps, mapDispatch)(ProjectType);
export default projectType;
