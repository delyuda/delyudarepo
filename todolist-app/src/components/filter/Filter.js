import React from 'react';
import './Filter.css';

class Filter extends React.Component{
    render () {
        return (
            <div className="filter">
                <div className="filter__title">Filter by:</div>
                <div className="filter-item">
                    <div className="filter-item__title">Title</div>
                    <div>
                        <input type="text" className="filter-item__input" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;