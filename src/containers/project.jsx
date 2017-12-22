import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';
import ProjectListReducer from '../reducers/project';
import uuid from 'uuid/v4';

class Project extends Component {
    render() {
        return (
            <div class="uk-panel">
                <div className="uk-button-group">
                    <a className="uk-button" href="/#/">
                        {'<--'}
                    </a>
                </div>
                <h1 class="uk-panel-title">
                    <InlineEdit
                        text={this.props.project.name}
                        paramName="name"
                        change={data => this.props.rename(data.name)}
                    />
                </h1>
                <h3 class="uk-panel-title">{this.props.match.params.uuid}</h3>
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
        rename: name => {
            dispatch(ProjectListReducer.projectRename(props.match.params.uuid, name));
        }
    };
};

const project = connect(mapProps, mapDispatch)(Project);
export default project;
