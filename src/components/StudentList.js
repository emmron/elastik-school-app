import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listStudents } from '../graphql/queries';
import { deleteStudent } from '../graphql/mutations';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const studentData = await API.graphql(graphqlOperation(listStudents));
      setStudents(studentData.data.listStudents.items);
    } catch (error) {
      setError('Error fetching students: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.graphql(graphqlOperation(deleteStudent, { input: { id } }));
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      setError('Error deleting student: ' + error.message);
    }
  };

  return (
    <div className="student-list">
      {error && <p className="error">{error}</p>}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.firstName} {student.lastName} ({student.id})
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;