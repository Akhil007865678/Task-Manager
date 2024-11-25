import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './style.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login_card">
        <div className="titleCard_login">Login</div>
        <div className="loginCredentials">
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </div>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <div className="login_buttons">
                <button className="login-btn" type="submit">Login</button>
            </div>
            <p>Don't any account? <a href="/signup">Signup</a></p>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
