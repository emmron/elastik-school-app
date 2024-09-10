import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth, Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      Amplify.configure(awsExports);
    } catch (error) {
      console.error('Error configuring Amplify:', error);
      setError('Failed to configure Amplify. Please check your setup.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await Auth.signIn(email, password);
      navigate('/dashboard');
    } catch (loginError) {
      console.error('Login error:', loginError);
      setError(`Login failed: ${loginError.message || JSON.stringify(loginError)}`);
    }
  };

  return (
    <div className="login-page">
      <h1>Teacher Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Don't have an account? <Link to="/signup">Create one here</Link>.</p>
      <p>Forgot your password? <Link to="/forgot-password">Reset it here</Link></p>
    </div>
  );
};

export default LoginPage;