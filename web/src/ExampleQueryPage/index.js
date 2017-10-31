import React, { Component } from 'react';

class ExampleQueryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: false
    };
  }

  componentDidMount() {
    this.loading = true;

    let myRequest = new Request('/api/db', {
      method: 'GET',
      headers: this.props.getAuthorizationHeader()
    });

    fetch(myRequest)
      .then(response => {
        this.loading = false;
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
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

    if (this.loading) {
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

export default ExampleQueryPage;
