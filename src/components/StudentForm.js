import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createStudent } from '../graphql/mutations';
import awsExports from '../aws-exports';

const StudentForm = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    id: ''  // Changed back to 'id' from 'studentId'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    try {
      API.configure(awsExports);
    } catch (error) {
      console.error('Error configuring API:', error);
      setError('Failed to configure API. Please check your setup.');
    }
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!student.email || !student.firstName || !student.id) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const input = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        dob: student.dob,
        id: student.id  // Changed back to 'id' from 'studentId'
      };
      await API.graphql(graphqlOperation(createStudent, { input }));
      setSuccess('Student created successfully!');
      setStudent({ firstName: '', lastName: '', email: '', dob: '', id: '' }); // Reset form fields
    } catch (error) {
      console.error('Error creating student:', error);
      setError('Failed to create student: ' + (error.errors?.[0]?.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="student-form-container">
      <h2>Create New Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="email"
          type="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="dob"
          type="date"
          value={student.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <input
          name="id"  // Changed back to 'id' from 'studentId'
          value={student.id}  // Changed back to 'student.id' from 'student.studentId'
          onChange={handleChange}
          placeholder="Student ID"
          required
        />
        <button type="submit">Create Student</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default StudentForm;