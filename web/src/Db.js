import React, { Component } from 'react';

class Db extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  componentDidMount() {
    var self = this;

    fetch('/api/db')
      .then(res => res.json())
      .then(json => {
        self.setState({'todos': json.todos});
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
