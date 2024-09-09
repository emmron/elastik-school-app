import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createStudent } from '../graphql/mutations';

const StudentForm = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    id: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.graphql(graphqlOperation(createStudent, { input: student }));
      setSuccess('Student created successfully!');
      setStudent({ firstName: '', lastName: '', email: '', dob: '', id: '' });
    } catch (error) {
      setError('Failed to create student: ' + error.message);
    }
  };

  return (
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
      />
      <input
        name="dob"
        type="date"
        value={student.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
      />
      <input
        name="id"
        value={student.id}
        onChange={handleChange}
        placeholder="ID"
        required
      />
      <button type="submit">Create Student</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default StudentForm;