import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'stringifier';

class ErrorCard extends Component {
    render() {
        return (
            <section className="card">
                <header className="card-header bg-light text-left text-red">
                    <h2>{this.props.topic}</h2>
                </header>
                <div className="card-body">
                    <p className="lead">{stringify(this.props.error)}</p>
                </div>
            </section>
        );
    }
}

ErrorCard.propTypes = {
    topic: PropTypes.string,
    error: PropTypes.any
};

export default ErrorCard;
