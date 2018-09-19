import React, { Component } from 'react';

class SearchComponent extends Component {
    render() {
        return (
            <div className="top-bar-item top-bar-item-full">
                <div className="top-bar-search">
                    <div className="input-group input-group-search">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {' '}
                                <span className="oi oi-magnifying-glass" />
                            </span>
                        </div>
                        <input type="text" className="form-control" aria-label="Search" placeholder="Search" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComponent;
