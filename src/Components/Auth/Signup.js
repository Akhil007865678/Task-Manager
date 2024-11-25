import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './style.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
    <form onSubmit={handleSubmit} className="login_card">
      <div className="titleCard_login">Signup</div>
      <div className="loginCredentials">
          <div className='usernameLogin'>
              <input className='userNameLoginUserName' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className='usernameLogin'>
              <input className='userNameLoginUserName' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div className="login_buttons">
              <button className="login-btn" type="submit">Signup</button>
          </div>
          <p>Already have an account? <a href="/login">Login</a></p>
      </div>
      
    </form>
  </div>
  );
};

export default Signup;
