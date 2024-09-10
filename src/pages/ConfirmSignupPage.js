import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ConfirmSignupPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await Auth.confirmSignUp(email, code);
      navigate('/login');
    } catch (error) {
      setError('Failed to confirm signup: ' + error.message);
    }
  };

  return (
    <div className="confirm-signup-page">
      <h1>Confirm Signup</h1>
      <form onSubmit={handleSubmit} className="confirm-signup-form">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Confirmation Code"
          required
        />
        <button type="submit">Confirm</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConfirmSignupPage;