import React, { Component } from 'react';

class Db extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  componentDidMount() {
    const { getAccessToken } = this.props.auth;
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${getAccessToken()}`);

    let myRequest = new Request('/api/db', {
      method: 'GET',
      headers: myHeaders
    });

    fetch(myRequest)
      .then(res => res.json())
      .then(json => {
        this.setState({'todos': json.todos});
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    let todoList = this.state.todos.map(function(todo) {
      return <li key={todo._id}>{todo.task}</li>;
    });

    if (!this.state.todos || !this.state.todos.length) {
      return <div>loading...</div>
    } else {
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
}

export default Db;
