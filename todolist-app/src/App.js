import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.css';
import './App.css';

import VisibleTodolist from './containers/VisibleTodolist';
import DataFilter from './containers/DataFilter';
import ItemForm from './components/item-form/ItemForm';

import { addItem } from './actions';


class App extends Component {
  render() {
      return (
          <div className="wrapper">
              <div className="add-item">
                  <div className="add-item__title">Add new todo item</div>
                  <ItemForm onSubmit={this.submitForm.bind(this)} />
              </div>
              <div className="main">
                  <DataFilter />
                  <VisibleTodolist />
              </div>
          </div>
      );
  }

  submitForm (values, dispatch) {
      dispatch(addItem(values));
  }
}

export default App;
