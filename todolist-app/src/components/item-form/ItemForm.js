import React from 'react';
import {Field, reduxForm} from 'redux-form';

import './ItemForm.css';

let ItemForm = props => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className="item-form">
            <div className="item-form-elem">
                <label htmlFor="title" className="item-form-elem__label">Title:</label>
                <Field name="title" component="input" type="text" className="item-form-elem__input" />
            </div>
            <div className="item-form-elem">
                <label htmlFor="description" className="item-form-elem__label">Description:</label>
                <Field name="description" component="input" type="text" className="item-form-elem__input" />
            </div>
            <button type="submit" className="item-form-btn">Submit</button>
        </form>
    );
};

ItemForm = reduxForm({
    form: 'newItem'
})(ItemForm);

export default ItemForm;