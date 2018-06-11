import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolReducer from '../reducers/tool';
import Factory from '../managers';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';
import Select from 'react-select';
import Elaborate from '../elaborate';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class Tool extends Component {
    render() {
        const toolId = this.props.match.params.tool;
        const managerName = this.props.tool.manager || this.props.project.manager;
        const managerOptions = _.map(Factory.getAllManagers(), value => {
            return { value: value, label: _.startCase(value) };
        });
        const manager = Factory.newManager(managerName, this.props.match.params.project);

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-10">
                            <h1 className="text-muted">Tool</h1>
                            <h1>{this.props.tool.name}</h1>
                            <h3>
                                Project{' '}
                                <a href={`#/project/${this.props.match.params.project}`}>{this.props.project.name}</a>
                            </h3>
                            <InlineEdit
                                placeholder="Add summary"
                                text={this.props.tool.summary || ''}
                                paramName="summary"
                                change={data => this.props.configure(data)}
                                style={{
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="col col-2">
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
                    <div className="row">
                        <div className="col">
                            <InlineEdit
                                placeholder="Add description"
                                text={this.props.tool.description || ''}
                                paramName="description"
                                change={data => this.props.configure(data)}
                                editingElement="textarea"
                                style={{
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="card card-body">
                                        <div className="row">
                                            <div className="col-4">{this.props.tool.progress || 0}%</div>
                                            <div className="col">
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    value={this.props.tool.progress || 0}
                                                    onChange={newValue => this.props.configure({ progress: newValue })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card-body">
                                        {this.props.tool.complete
                                            ? 'Completed'
                                            : this.props.tool.started ? 'In progress' : 'Not started'}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-body float-right">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    this.props.configure({ complete: false, started: false })
                                                }
                                            >
                                                Reset
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => this.props.configure({ complete: false, started: true })}
                                            >
                                                Start
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => this.props.configure({ complete: true, started: false })}
                                            >
                                                Complete
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
        project: state.app.local.projects[props.match.params.project],
        tool: state.app.local.tools[props.match.params.project][props.match.params.tool]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        configure: (...params) => {
            dispatch(ToolReducer.toolConfigure(props.match.params.project, props.match.params.tool, ...params));
        }
    };
};

const doc = connect(mapProps, mapDispatch)(Tool);
export default doc;
