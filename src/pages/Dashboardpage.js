import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const DashboardPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <main className="dashboard-main">
        <section className="student-form-section">
          <h2>Add New Student</h2>
          <StudentForm />
        </section>
        <section className="student-list-section">
          <h2>Student List</h2>
          <StudentList />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;