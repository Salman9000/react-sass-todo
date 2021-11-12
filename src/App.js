import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import "./css/styles.css"

const App = () => {
  const [inputTodo, setInputTodo] = useState("")
  const [todoId, setTodoId] = useState(3)
  const [todoArray, setTodoArray] = useState([
    {id: 0, text: "Get Eggs"},
    {id: 1, text: "Get Bread"},
    {id: 2, text: "Go for a walk walking"}
  ])

  const addTodo = () => {
    setTodoArray([...todoArray, {id: todoId, text: inputTodo}])
    setTodoId((prevId) => prevId + 1)
    setInputTodo("")
  }

  const removeFromTodo = (todoId) => {
    setTodoArray(todoArray.filter(todo => todoId !== todo.id))
  }

  const editTodo = (newText, todoId) => {
    const todoArrayCopy = [...todoArray]
    const todoElement = todoArrayCopy.filter(todo => todoId === todo.id )[0]
    todoElement.text = newText
    // console.log(todoElement)
    setTodoArray(todoArrayCopy)
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
        <div className="list">
          {todoArray.length > 0 ? todoArray.map(todo => (
            <div className="eachTodoCard" key={todo.id}>
              <p className="todoText">{todo.text}</p>
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
