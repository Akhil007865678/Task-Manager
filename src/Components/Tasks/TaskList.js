import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import './style1.css';
const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const taskCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(taskCollection);
      const taskList = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
      setFilteredTasks(taskList);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setFilteredTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
  };

  return (
    <>
    <div className="nav">
      <h2 className="heading">Task Manager</h2>
      <input
        className="search"
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <button onClick={() => navigate('/login')} className="btn">Login</button>
      <button onClick={() => navigate('/new')} className="btn">Create Task</button>
    </div>
    <div className="login">
      <div className="list_card">
      <div className="titleCard_login">
          Task List
        </div>
        <div className="loginCredential">
          <div className='usernameLogin'>
              <ul className="task">
                {filteredTasks.map((task) => (
                  <li key={task.id}>
                    <h3 className="title">{task.title}</h3>
                    <div className="description"><p>{task.description}</p></div>
                    <button onClick={() => navigate(`/update/${task.id}`)} className="edit">Edit</button>
                    <button className="edit" onClick={() => handleDelete(task.id)}>Delete</button>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TaskList;


