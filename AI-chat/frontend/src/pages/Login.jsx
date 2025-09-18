import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login', { email, password });
    axios.post('http://localhost:3000/auth/login', { email, password },{withCredentials: true})
      .then(response => {
        navigate('/');
        console.log('Login successful:', response.data);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-card" aria-labelledby="login-heading">
          <h1 id="login-heading">Sign in</h1>
          <br />
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="label-text">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email@example.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span className="label-text">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                autoComplete="current-password"
              />
            </label>

            <button type="submit" className="btn primary">Sign in</button>
          </form>

          <p className="muted small">
            <br />
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
