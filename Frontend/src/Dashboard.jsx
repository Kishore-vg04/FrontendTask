import { useEffect, useState } from "react";
import api from "./api/axios";
import './App.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
          <button onClick={()=>deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}