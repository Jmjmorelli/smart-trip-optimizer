import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; // make sure this has baseURL set properly

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/register', { name, email, password });

      if (response.status === 201) {
        alert('Registered successfully! Please login.');
        navigate('/login');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        alert('Email already registered! Please login.');
        navigate('/login');
      } else {
        alert('Registration failed, please try again.');
        console.error(err);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))' }}>
      <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-4 text-center text-primary">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login" className="btn btn-link p-0">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
