import React from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const UserWidget = ({ user }) => {
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      history.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="user-widget">
      <span>Welcome, {user.attributes.email}</span>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UserWidget;