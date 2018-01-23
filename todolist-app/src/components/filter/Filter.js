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
                        <input type="text" className="filter-item__input" name="title"
                               onChange={ (event) =>
                                   this.props.filterData({type: 'title', value: event.target.value})
                               }/>
                    </div>
                </div>
                <div className="filter-item">
                    <div className="filter-item__title">Date</div>
                    <div>
                        <input type="text" className="filter-item__input" placeholder="YYYY-DD-MM"
                               onChange={ (event) =>
                                   this.props.filterData({type: 'date', value: event.target.value})
                               }/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;