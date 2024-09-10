import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      alert('Password has been successfully reset. Please login with your new password.');
      navigate('/');
    } catch (error) {
      setError(`Failed to reset password: ${error.message}`);
    }
  };

  return (
    <div className="reset-password-page">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;