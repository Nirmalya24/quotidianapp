import React, {useEffect, useState} from "react";

function TodosWidget() {
    const [currentTodo, setCurrentTodo] = useState("");

    const [todos, setTodos] = useState(
        localStorage.getItem("todos")
            ? JSON.parse(localStorage.getItem("todos"))
            : []
    );

    // useEffect to update the todos in localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function createNewTodo(currentTodo) {
        let todosArray = [...todos];
        todosArray.push({
            todo: currentTodo,
            isCompleted: false,
        });
        setTodos(todosArray);
    }

    function completeTodo(index) {
        let todosArray = [...todos];
        todosArray[index].isCompleted = !todosArray[index].isCompleted;
        setTodos(todosArray);
    }

    function deleteTodo(index) {
        let todosArray = [...todos];
        todosArray.splice(index, 1);
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
                        createNewTodo(currentTodo);
                        setCurrentTodo("");
                    }
                }}
            ></input>

            {todos.map((todo, index) => (
                <div key={index} className="flex items-center py-1">
                    <input
                        type="checkbox"
                        className="checkbox-success mx-2 cursor-pointer"
                        checked={todo.isCompleted}
                        onClick={() => completeTodo(index)}

                    />
                    <div className={`grow ${todo.isCompleted ? "line-through" : ""}`}>
                        {todo.todo}
                    </div>
                    <div onClick={() => deleteTodo(index)} className="cursor-pointer">
                        &#128465;
                    </div>
                </div>
            ))}
            {todos.length > 0 && `${todos.length} items`}
        </div>
    );
}

export default TodosWidget;
