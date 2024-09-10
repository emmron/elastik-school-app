import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listStudents } from '../graphql/queries';
import { deleteStudent } from '../graphql/mutations';
import awsExports from '../aws-exports';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      API.configure(awsExports);
      fetchStudents();
    } catch (error) {
      console.error('Error configuring API:', error);
      setError('Failed to configure API. Please check your setup.');
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const studentData = await API.graphql(graphqlOperation(listStudents));
      setStudents(studentData.data.listStudents.items);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students: ' + (error.message || JSON.stringify(error)));
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.graphql(graphqlOperation(deleteStudent, { input: { id } }));
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Error deleting student: ' + (error.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="student-list">
      <h2 className="student-list-title">Student Directory</h2>
      {error && <p className="error-message">{error}</p>}
      {students.length === 0 ? (
        <p className="no-students-message">No students enrolled yet.</p>
      ) : (
        <ul className="student-grid">
          {students.map(student => (
            <li key={student.id} className="student-card">
              <div className="student-info">
                <span className="student-name">{student.firstName} {student.lastName}</span>
                <span className="student-id">ID: {student.id}</span>
              </div>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(student.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;