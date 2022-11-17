import React, {useEffect, useState} from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

function TodosWidget() {
  const URL = "https://quotidianapp-dev.up.railway.app/api";
  //   const URL = "http://localhost:5001/api";
  const [email, setEmail] = useState(localStorage.getItem("loginData").email);
  const [currentTodo, setCurrentTodo] = useState("");

  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  // Fetch all todos from the server
  useEffect(() => {
    fetchTodoItems()
      .then((r) => console.log("Fetched todos:", r))
      .catch((e) => {
        console.log("Error fetching todos:", e);
        setTodos(JSON.parse(localStorage.getItem("todos")));
      });
  }, []);

  // useEffect to update the todos in localStorage
  useEffect(() => {
    console.log("Settings todos in localStorage:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const fetchTodoItems = async () => {
    // GET request with email as body parameter
    const response = await axios.get(`${URL}/getTodoItems`, {
      body: {
        email: JSON.parse(localStorage.getItem("loginData")).email,
      },
    });
    if (response.status === 200) {
      setTodos(response.data);
    }
  };

  const addTodoItem = async () => {
    let todoItem = {
      todoId: uuid(),
      description: currentTodo,
      completed: false,
    };
    console.log("Adding todo item:", todoItem);
    if (currentTodo === "") {
      return;
    }

    // POST request with email and todoItem as body parameters
    const response = await axios.post(`${URL}/addTodoItem`, {
      body: {
        email: JSON.parse(localStorage.getItem("loginData")).email,
        todo: todoItem,
      },
    });
    if (response.status === 200) {
      console.log("Todo item added successfully");
      setTodos([...todos, todoItem]);
      setCurrentTodo("");
    }
  };

  const deleteTodoItem = async (todoId) => {
    // DELETE request with todoId as path parameters
    console.log("Deleting todo item");
    const response = await axios.delete(`${URL}/deleteTodoItem/${todoId}`);
    console.log("Response:", response);
    if (response.status === 200) {
      // update the local todos state
      console.log("Todo item deleted successfully");
      setTodos(todos.filter((todo) => todo.todoId !== todoId));
    }
  };

  function completeTodo(index) {
    let todosArray = [...todos];
    todosArray[index].completed = !todosArray[index].completed;
    setTodos(todosArray);
  }

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text text-white">What needs to get done?</span>
      </label>
      <input
        type="text"
        placeholder="Type your todo here"
        className="input input-bordered w-full max-w-xs my-2 text-white"
        value={currentTodo}
        onChange={(e) => setCurrentTodo(e.target.value)}
        // On Enter key down, create a new todoItem
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodoItem();
            setCurrentTodo("");
          }
        }}
      ></input>

      {todos.map((todo, index) => (
        <div key={todo.todoId} className="flex items-center py-1">
          <input
            type="checkbox"
            className="checkbox-success mx-2 cursor-pointer"
            checked={todo.completed}
            onClick={() => completeTodo(index)}
            readOnly
            // onChange={() => {
            //   todos[index].completed = !todos[index].completed;
            // }}
          />
          <div className={`grow ${todo.completed ? "line-through" : ""}`}>
            {todo.description}
          </div>
          <div
            onClick={() => deleteTodoItem(todo.todoId)}
            className="cursor-pointer"
          >
            &#128465;
          </div>
        </div>
      ))}
      {todos.length > 0 && `${todos.length} items`}
    </div>
  );
}

export default TodosWidget;
