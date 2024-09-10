import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      navigate('/');
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <header>
        <h1>Teacher Dashboard</h1>
        <div className="user-widget">
          <span>Welcome, {user.attributes.email}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>
      <main>
        <section>
          <h2>Add New Student</h2>
          <StudentForm />
        </section>
        <section>
          <h2>Student List</h2>
          <StudentList />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;