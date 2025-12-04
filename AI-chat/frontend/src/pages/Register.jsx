import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('register', { email, firstName, lastName, password });
    axios.post('http://localhost:3000/auth/register', { email, fullname:{firstName, lastName}, password }, { withCredentials: true })
      .then(response => {
        console.log('Registration successful:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  };




  return (
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-card" aria-labelledby="register-heading">
          <h1 id="register-heading">Create account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="row">
              <label className="field">
                <span className="label-text">First name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  required
                  autoComplete="given-name"
                />
              </label>

              <label className="field">
                <span className="label-text">Last name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  autoComplete="family-name"
                />
              </label>
            </div>

            <label className="field">
              <span className="label-text">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                placeholder="Create a password"
                required
                autoComplete="new-password"
              />
            </label>

            <button type="submit" className="btn primary">Create account</button>
          </form>

          <p className="muted small">
            <br />
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Register;

