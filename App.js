import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("Work");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  // Comments & Notes Section
  const [notes, setNotes] = useState("");

  // Contact Form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Load tasks from localStorage when the app loads
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add Task Function
  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      category: taskCategory,
      priority: taskPriority,
      dueDate: taskDueDate,
      status: "Not Started", // Added status
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
    setTaskPriority("Low");
    setTaskDueDate("");
  };

  // Toggle Task Completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove Task Function
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle Category Change
  const changeCategory = (e) => {
    setTaskCategory(e.target.value);
  };

  // Handle Priority Change
  const changePriority = (e) => {
    setTaskPriority(e.target.value);
  };

  // Handle Due Date Change
  const changeDueDate = (e) => {
    setTaskDueDate(e.target.value);
  };

  // Handle Status Change
  const changeStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Filter Tasks Based on Status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // Show all tasks
  });

  // Get Count of Completed and Incomplete Tasks
  const completedCount = tasks.filter((task) => task.completed).length;
  const incompleteCount = tasks.filter((task) => !task.completed).length;

  // Handle Comment/Note Change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Handle Contact Form Input Change
  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Contact Form Submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${contactForm.name} via email: ${contactForm.email}`);
    setContactForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Flow Task</h1>

        {/* Task Completion Tracker */}
        <div className="task-tracker">
          <p>
            Completed: {completedCount} / Total: {tasks.length}
          </p>
        </div>

        {/* Task Input Section */}
        <div className="input-container">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter a task..."
          />
          <select
            value={taskPriority}
            onChange={changePriority}
            className="priority-select"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            value={taskDueDate}
            onChange={changeDueDate}
            className="due-date-input"
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {/* Filters */}
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("incomplete")}>Incomplete</button>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
              <span className="task-category">{task.category}</span>
              <span className="task-priority">Priority: {task.priority}</span>
              <span className="task-due-date">Due: {task.dueDate}</span>

              {/* Task Status Dropdown */}
              <select
                value={task.status}
                onChange={(e) => changeStatus(task.id, e.target.value)}
                className="status-select"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button onClick={() => removeTask(task.id)}>*</button>
            </li>
          ))}
        </ul>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form action="https://api.web3forms.com/submit" method="POST">
            {/* Access Key */}
            <input
              type="hidden"
              name="access_key"
              value="65187239-dfdc-4e63-acc5-04ff4f2ac690"
            />
            {/* Name Input */}
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                required
              />
            </div>

            {/* Redirect after form submission */}
            <input
              type="hidden"
              name="redirect"
              value="https://web3forms.com/success"
            />

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit">Submit Form</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
