import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import DocumentListReducer from '../reducers/document';

class DocumentListItem extends Component {
    constructor(props, state) {
        super(props, state);
        this.getActionButtons = this.getActionButtons.bind(this);
        this.statusBackground = this.statusBackground.bind(this);
    }

    statusBackground() {
        if (!this.props.documentState.progress || this.props.documentState.progress === 0) {
            return 'bg-secondary';
        }

        if (this.props.documentState.progress !== 100) {
            return 'bg-warning';
        }

        return 'bg-success';
    }

    getActionButtons() {
        if (this.props.documentState.started && !this.props.documentState.complete) {
            return (
                <button
                    type="button"
                    className="btn btn-secondary float-right"
                    onClick={() => this.props.configure({ complete: true, started: false })}
                >
                    Complete
                </button>
            );
        }
        if (!this.props.documentState.started && !this.props.documentState.complete) {
            return (
                <button
                    type="button"
                    className="btn btn-secondary float-right"
                    onClick={() => this.props.configure({ complete: false, started: true })}
                >
                    Start
                </button>
            );
        }
        return <div />;
    }

    render() {
        return (
            <li className={`list-group-item ${this.statusBackground()}`}>
                <div className="row">
                    <div className="col">
                        <a href={`#/document/${this.props.project}/${this.props.document}`}>
                            {this.props.documentState.name}
                        </a>
                    </div>
                    <div className="col">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="col">{this.props.documentState.progress || 0}%</div>
                                <div className="col"> {this.getActionButtons()}</div>
                            </div>
                            <div className="row">
                                <Slider
                                    min={0}
                                    max={100}
                                    value={this.props.documentState.progress || 0}
                                    onChange={newValue => this.props.configure({ progress: newValue })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

const mapProps = (state, props) => {
    return {
        documentState: state.app.local.documents[props.project][props.document]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        configure: params => {
            dispatch(DocumentListReducer.documentConfigure(props.project, props.document, params));
        }
    };
};

const documentListItem = connect(mapProps, mapDispatch)(DocumentListItem);
export default documentListItem;
