import React, { useState, useEffect } from "react"
import AddTodo from "./components/forms/AddTodo"
import Todo from "./components/Todo"

function App() {
  const [todos, setTodos] = useState([])
  
  const getTodos = () => {
    fetch("http://localhost:5000/todos")
    .then(res => res.json())
    .then(data => {
      setTodos(data)
    }).catch (e => console.error(e))
  }

  useEffect( () => {
    getTodos()
  }, [])

  const showTodos = todos.map(todo => <Todo key={todo._id} data={todo}  getTodos={getTodos} />)

  return (
    <div className="App">
      <AddTodo getTodos={getTodos}/>
      {showTodos}
    </div>
  );
}

export default App;
