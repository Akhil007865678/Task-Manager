import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import './style1.css';
const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const taskCollection = collection(db, "tasks");
      await addDoc(taskCollection, { title, description });
      navigate("/");
    } catch (error) {
      alert("Error adding task: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login_card">
        <div className="titleCard_login">Task Form</div>
        <div className="loginCredentials">
            <div className="usernameLogin">
                <input
                   className="userNameLoginUserName"
                   type="text"
                   placeholder="Task Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   required
                 />
            </div>
            <div className="usernameLogin">
                <textarea
                  className="textarea"
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
            </div>
            <div className="login-btn">
                <button type="submit" disabled={loading}>
                  {loading ? "Adding Task..." : "Add Task"}
                </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
