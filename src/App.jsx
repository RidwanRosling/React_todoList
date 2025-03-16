import { useState } from "react";

function App() {
  return (
    <div>
      <Header />
      <InptUser />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>To-Do List</h1>
    </header>
  );
}

function InptUser() {
  const [task, setTask] = useState(" ");
  const [tasks, setTasks] = useState([]); // to save task list

  // Tambah task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteButton = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Render daftar tugas */}
      <div>
        {tasks.map((t, index) => (
          <UserTask key={index} task={t} onDelete={() => deleteButton(index)} />
        ))}
      </div>
    </div>
  );
}

function UserTask({ task, onDelete }) {
  return (
    <div>
      <p>{task}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default App;
