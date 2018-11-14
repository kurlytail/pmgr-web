import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorCard extends Component {
    render() {
        return (
            <section className="card">
                <header className="card-header bg-light text-left text-red">
                    <h2>{this.props.topic}</h2>
                </header>
                <div className="card-body">
                    <p className="lead">
                        {typeof this.props.error === 'object' ? this.props.error.error : this.props.error}
                    </p>
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
