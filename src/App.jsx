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
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const deleteButton = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  const handleUpdate = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  const toggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
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

      <div>
        {tasks.map((t, index) => (
          <UserTask
            key={index}
            task={t}
            onDelete={() => deleteButton(index)}
            onEdit={() => startEdit(index)}
            isEditing={editIndex === index}
            editValue={editValue}
            setEditValue={setEditValue}
            onUpdate={() => handleUpdate(index)}
            onToggleDone={() => toggleDone(index)}
          />
        ))}
      </div>
    </div>
  );
}

function UserTask({
  task,
  onDelete,
  onEdit,
  isEditing,
  editValue,
  setEditValue,
  onUpdate,
  onToggleDone,
}) {
  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={onUpdate}>Save</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={task.done} onChange={onToggleDone} />
          <span
            style={{
              textDecoration: task.done ? "line-through" : "none",
              marginLeft: "8px",
              marginRight: "8px",
            }}
          >
            {task.text}
          </span>
          <button onClick={onDelete}>Delete</button>
          <button onClick={onEdit}>Update</button>
        </>
      )}
    </div>
  );
}

export default App;
