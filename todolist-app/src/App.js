import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.css';
import './App.css';

import Todolist from './components/todolist/Todolist.js';
import Filter from './components/filter/Filter.js';
import ItemForm from './components/item-form/ItemForm.js';


class App extends Component {
  render() {
      const dataMock = [
          {
              id: 1,
              title: "Test title one",
              description: "Test description one",
              created_at: "2018-22-01"
          },
          {
              id: 2,
              title: "Test title two",
              description: "Test description two",
              created_at: "2018-22-01"
          },
          {
              id: 3,
              title: "Some title three",
              description: "Some description three",
              created_at: "2018-22-01"
          }
      ];

      return (
          <div className="wrapper">
              <div className="add-item">
                  <div className="add-item__title">Add new todo item</div>
                  <ItemForm onSubmit={this.submitForm} />
              </div>
              <div className="main">
                  <Filter />
                  <Todolist data={dataMock} />
              </div>
          </div>
      );
  }

  submitForm (values) {
      console.log('values',values);
  }
}

export default App;
