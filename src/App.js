import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import "./css/styles.css"

const axios = require('axios');

const App = () => {
  const [inputTodo, setInputTodo] = useState("")
  // const [todoId, setTodoId] = useState(3)
  const [todoArray, setTodoArray] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);

  const getTodoList = async () => {
    setErrorMessage(null)
  const todoList = await axios.get("http://localhost:3001/api/todoList")
  setTodoArray(todoList.data)
  }
  useEffect(() => {
  getTodoList()
  }, [])

  const addTodo = async () => {
    // setTodoArray([...todoArray, {id: todoId, text: inputTodo}])
    // setTodoId((prevId) => prevId + 1)
    try {
      setInputTodo("")
      const reponse = await axios.post("http://localhost:3001/api/addTodo", {
        text: inputTodo
      })
      console.log(reponse.data)
      getTodoList()
    } catch(e) {
      setErrorMessage(e.response.data.message)
    }
   
  }

  const removeFromTodo = async (todoId) => {
    // setTodoArray(todoArray.filter(todo => todoId !== todo.id))
    const meow = await axios.delete(`http://localhost:3001/api/deletetodo/${todoId}`)
    console.log(meow)
    getTodoList()
  }

  const editTodo = async (newText, todoId) => {
    // const todoArrayCopy = [...todoArray]
    // const todoElement = todoArrayCopy.filter(todo => todoId === todo.id )[0]
    // todoElement.text = newText
    // console.log(todoElement)
    await axios.put(`http://localhost:3001/api/updatetodo/${todoId}`, {
      text: newText
    })
    getTodoList()
    // setTodoArray(todoArrayCopy)
  }
  return (
    <div className="container">
      <div>
        <h1>What's the Plan for Today</h1>
      <div className="todolist">
        <div className="input-field">
          <input placeholder="Add a todo" type="text" value={inputTodo} onChange={e => setInputTodo(e.target.value)} />
          {inputTodo !== "" ? <button className="btn-form" onClick={() => addTodo()}>
            Add Todo
          </button> : 
          <button className="btn-form btn-disable" disabled onClick={() => addTodo()}>
          Add Todo
        </button>}
        </div>
        <p className="message-error">{errorMessage}</p>
        <div className="list">
          {todoArray?.length > 0 ? todoArray.map(todo => (
            <div className="eachTodoCard" key={todo.id}>
              <p className="todoText">{todo.text} {todo.id}</p>
              <div className="icons-container">
                <AiOutlineCloseCircle className="icon" onClick={() => removeFromTodo(todo.id)}/>
                <AiOutlineEdit className="icon" onClick={() => editTodo(prompt("Edit text", `${todo.text}`), todo.id)} />
              </div>
            </div>
          )) : <div><h1>Hmmm... here is nothing here.</h1><h1>Add an item to get started</h1></div>}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
