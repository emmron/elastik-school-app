import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      navigate('/confirm-signup', { state: { email } });
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('Failed to sign up: ' + (error.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="signup-page">
      <h1>Teacher Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignupPage;