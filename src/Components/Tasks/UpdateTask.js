import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import './style1.css';

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDoc = doc(db, "tasks", taskId);
        const taskSnapshot = await getDoc(taskDoc);
        if (taskSnapshot.exists()) {
          const taskData = taskSnapshot.data();
          setTitle(taskData.title);
          setDescription(taskData.description);
        } else {
          alert("Task not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        alert("Failed to fetch task details.");
      }
    };

    fetchTask();
  }, [taskId, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, {
        title,
        description,
        updatedAt: new Date(),
      });
      alert("Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleUpdate} className="login_card">
        <div className="titleCard_login">
            Update Task
        </div>
        <div className="loginCredentials">
            <div className='usernameLogin'>
                <input
                  className="userNameLoginUserName"
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
            </div>
            <div className='usernameLogin'>
                <textarea
                className="textarea"
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
            </div>
            <div className="login_buttons">
                <button className="login-btn" type="submit" disabled={loading}>
                  {loading ? "Updating" : "Update"}
                </button>
            </div>
        </div>
        
        
      </form>
    </div>
  );
};

export default UpdateTask;
