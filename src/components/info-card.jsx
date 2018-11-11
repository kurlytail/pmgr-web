import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'stringifier';

class InfoCard extends Component {
    render() {
        return (
            <section className="card">
                <header className="card-header bg-light text-left">
                    <h2>{this.props.topic}</h2>
                </header>
                <div className="card-body">
                    <p className="lead">{stringify(this.props.info)}</p>
                </div>
            </section>
        );
    }
}

InfoCard.propTypes = {
    topic: PropTypes.string,
    info: PropTypes.any
};

export default InfoCard;
