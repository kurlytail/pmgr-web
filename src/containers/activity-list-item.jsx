import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ActivityListReducer from '../reducers/activity';

class ActivityListItem extends Component {
    constructor(props, state) {
        super(props, state);
        this.statusBackground = this.statusBackground.bind(this);
    }

    statusBackground() {
        if (!this.props.activityState.progress || this.props.activityState.progress === 0) {
            return 'bg-secondary';
        }

        if (this.props.activityState.progress !== 100) {
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
                            <a href={`#/activity/${this.props.project}/${this.props.activity}`}>
                                {this.props.activityState.name}
                            </a>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">{this.props.activityState.progress || 0}%</div>
                            </div>
                            <div className="row">
                                <Slider
                                    min={0}
                                    max={100}
                                    value={this.props.activityState.progress || 0}
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
        activityState: state.app.local.activities[props.project][props.activity]
    };
};

const mapDispatch = (dispatch, props) => {
    return {
        configure: params => {
            dispatch(ActivityListReducer.activityConfigure(props.project, props.activity, params));
        }
    };
};

const activityListItem = connect(mapProps, mapDispatch)(ActivityListItem);
export default activityListItem;
