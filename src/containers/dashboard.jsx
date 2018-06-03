import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="card-metric col">
                        <div className="metric">
                            <p className="metric-value h3">
                                <sub>
                                    <i className="oi oi-fork" />
                                </sub>
                                <span className="value">{Object.keys(this.props.system.projects).length}</span>
                            </p>
                            <h2 className="metric-label">Projects</h2>
                        </div>
                    </div>

                    <div className="card-metric col">
                        <div className="metric">
                            <p className="metric-value h3">
                                <sub>
                                    <i className="oi oi-fork" />
                                </sub>
                                <span className="value">{Object.keys(this.props.system.projectTypes).length}</span>
                            </p>
                            <h2 className="metric-label">Project Types</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapProps = (state, props) => {
    return {
        system: state.app.local
    };
};

const mapDispatch = (dispatch, props) => {
    return {};
};

const dashboard = connect(mapProps, mapDispatch)(Dashboard);
export default dashboard;
