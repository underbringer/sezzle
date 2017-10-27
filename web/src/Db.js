import React, { Component } from 'react';

import axios from 'axios';

class Db extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  componentDidMount() {
    var self = this;
    axios.get('/api/db')
      .then(function (response) {
        self.setState({todos: response.data.todos});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let todoList = this.state.todos.map(function(todo) {
      return <li key={todo._id}>{todo.task}</li>;
    });

    return (
      <div className="Db">

        <h1>todos from a db call</h1>
        <ul>
          {todoList}
        </ul>

      </div>
    );
  }
}

export default Db;
