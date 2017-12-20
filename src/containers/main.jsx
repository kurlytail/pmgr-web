import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';

class Main extends Component {
    render() {
        if (this.props.project.name) {
            return (
                <div className="uk-panel uk-panel-box uk-panel-box-primary">
                    <h1 className="uk-panel-title">
                        <InlineEdit text={this.props.project.name} change={this.props.nameChanged} paramName="name"/>
                    </h1>
                </div>
            );
        } else {
            return <div>Project initializing</div>;
        }
    }
}

const mapProps = state => {
    return {
        project: state.app.project
    };
};

const mapDispatch = dispatch => {
    return {
        nameChanged: data => dispatch({ type: 'PROJECT_INIT', name: data.name })
    };
};

const connectMain = connect(mapProps, mapDispatch)(Main);
export default connectMain;
