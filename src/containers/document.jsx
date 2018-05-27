import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentReducer from '../reducers/document';
import Factory from '../managers';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline';
import Select from 'react-select';
import Elaborate from '../elaborate';

class Document extends Component {
    render() {
        const managerName = this.props.document.manager || this.props.project.manager;
        const managerOptions = _.map(Factory.getAllManagers(), value => {
            return { value: value, label: _.startCase(value) };
        });
        const manager = Factory.newManager(managerName, this.props.match.params.project);

        const toolsModifyingDocument = Elaborate.getToolsModifyingDocument(this.props.match.params.document);
        const toolsUsingDocument = Elaborate.getToolsModifyingDocument(this.props.match.params.document);

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <h6 className="text-muted">Document</h6>
                            <h1 className="card-title">{this.props.document.name}</h1>
                            <h3>Project {this.props.project.name}</h3>
                            <InlineEdit
                                placeholder="Add summary"
                                text={this.props.document.summary || ''}
                                paramName="summary"
                                change={data => this.props.configure(data)}
                                style={{
                                    width: '100%'
                                }}
                            />
                        </div>
                        <div className="col col-xs-2 col-sm-2 col-md-2 col-lg-2">
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
                    <InlineEdit
                        placeholder="Add description"
                        text={this.props.document.description || ''}
                        paramName="description"
                        change={data => this.props.configure(data)}
                        editingElement="textarea"
                        style={{
                            width: '100%'
                        }}
                    />
                </div>
                <div>{manager.config(this.props.project)}</div>

                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Tools</h4>
                            </div>
                            <ul className="list-group" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Modified by activities</h4>
                            </div>
                            <ul className="list-group" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Used by activities</h4>
                            </div>
                            <ul className="list-group" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Related Process Groups</h4>
                            </div>
                            <ul className="list-group" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Related Processes</h4>
                            </div>
                            <ul className="list-group" />
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
        document: state.app.local.documents[props.match.params.project][props.match.params.document]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        configure: (...params) => {
            dispatch(
                DocumentReducer.documentConfigure(props.match.params.project, props.match.params.document, ...params)
            );
        }
    };
};

const doc = connect(mapProps, mapDispatch)(Document);
export default doc;
