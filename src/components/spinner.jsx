import React, { Component } from 'react';
//import { RingLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import Loadable from 'react-loading-overlay';

class Spinner extends Component {
    render() {
        return (
            <Loadable active={this.props.loading} spinner>
                {this.props.children}
            </Loadable>
        );
    }
}

Spinner.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.element
};

export default Spinner;
