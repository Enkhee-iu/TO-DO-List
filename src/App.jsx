// export default App;

import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    const trimmed = input.trim();
    if (trimmed === "") return;
    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <>
      <div className="container">
        <div className="smallbox">
          <h1 className="title">To-Do list </h1>
          <div className="inputdiv">
            <input
              className="inputbox"
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="btn" onClick={addTask}>
              Add
            </button>
            <div className="btndiv">
              <button
                className={`all btn2 ${filter === "all" ? "activebtn" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`active btn2 ${
                  filter === "active" ? "activebtn" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`completed btn2 ${
                  filter === "completed" ? "activebtn" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <li key={task.id} className={task.completed ? "done" : ""}>
                  <div className="checkinput">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={`txt ${task.completed ? "done" : ""}`}>
                      {task.text}
                    </span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => removeTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <p className="text">No tasks yet. Add one above!</p>
            <p className="footertxt">
              Powered by{" "}
              <a className="link" href="https://pinecone.mn/">
                Pinecone academy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
