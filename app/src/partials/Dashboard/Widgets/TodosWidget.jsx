import React, {useEffect, useState} from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

function TodosWidget() {
  //   const URL = "https://quotidianapp-dev.up.railway.app/api";
  const URL = "http://localhost:5001/api";
  const [email, setEmail] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")).email
      : null
  );
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

  const fetchTodoItems = async () => {
    // GET request with email as body parameter
    console.log("Fetching todos for:", email);
    const response = await axios.get(`${URL}/getTodoItems/${email}`);

    console.log("Response from server:", response);
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

  const updateTodoItem = async (todoId) => {
    // PATCH request with todoId as path parameters
    console.log("Updating todo item");
    const response = await axios.patch(`${URL}/updateTodoItem/${todoId}`);
    console.log("Response:", response);
    if (response.status === 200) {
      // update the local todos state
      let todosArray = [...todos];
      let index = todosArray.findIndex((todo) => todo.todoId === todoId);
      todosArray[index].completed = !todosArray[index].completed;
      setTodos(todosArray);
      console.log("Todo item updated successfully");
    }
  };

  return (
    <div className="form-control w-full max-w-xs">
      {email && (
        <>
          <label className="label">
            <span className="label-text text-white">
              What needs to get done?
            </span>
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
        </>
      )}

      {todos &&
        todos.map((todo) => (
          <div key={todo.todoId} className="flex items-center py-1">
            <input
              type="checkbox"
              className="checkbox-success mx-2 cursor-pointer"
              checked={todo.completed}
              onClick={() => updateTodoItem(todo.todoId)}
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
      {todos && todos.length > 0 && `${todos.length} items`}
      {email === null && (
        <div className="alert alert-error shadow-lg bg-red-700">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                color="white"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white">Error! Unable to retrieve tasks.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodosWidget;
