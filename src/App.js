import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import TaskList from "./Components/Tasks/TaskList";
import TaskForm from "./Components/Tasks/TaskForm";
import UpdateTask from "./Components/Tasks/UpdateTask";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update/:taskId" element={<UpdateTask />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
