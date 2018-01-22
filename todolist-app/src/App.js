import React, { Component } from 'react';
import logo from './logo.svg';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import Todolist from './components/todolist/Todolist.js';

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
          }
      ];

      return (
        <Todolist data={dataMock} />
      );
  }
}

export default App;
