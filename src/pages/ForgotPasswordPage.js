import React, { useState, useEffect } from 'react';
import { Auth, Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
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
      await Auth.forgotPassword(email);
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      console.error('Error initiating password reset:', error);
      setError('Failed to initiate password reset: ' + (error.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Remember your password? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default ForgotPasswordPage;