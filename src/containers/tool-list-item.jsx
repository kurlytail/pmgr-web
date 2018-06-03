import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ToolListReducer from '../reducers/tool';

class ToolListItem extends Component {
    constructor(props, state) {
        super(props, state);
        this.statusBackground = this.statusBackground.bind(this);
    }

    statusBackground() {
        if (!this.props.toolState.progress || this.props.toolState.progress === 0) {
            return 'bg-secondary';
        }

        if (this.props.toolState.progress !== 100) {
            return 'bg-warning';
        }

        return 'bg-success';
    }

    render() {
        return (
            <li className={`list-group-item ${this.statusBackground()}`}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href={`#/tool/${this.props.project}/${this.props.tool}`}>{this.props.toolState.name}</a>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">{this.props.toolState.progress || 0}%</div>
                            </div>
                            <div className="row">
                                <Slider
                                    min={0}
                                    max={100}
                                    value={this.props.toolState.progress || 0}
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
        toolState: state.app.local.tools[props.project][props.tool]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        configure: params => {
            dispatch(ToolListReducer.toolConfigure(props.project, props.tool, params));
        }
    };
};

const toolListItem = connect(mapProps, mapDispatch)(ToolListItem);
export default toolListItem;
