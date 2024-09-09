import { API, graphqlOperation } from 'aws-amplify';
import { createStudent, deleteStudent, updateStudent } from '../graphql/mutations';
import { getStudent, listStudents } from '../graphql/queries';

export const apiService = {
  createStudent: async (studentData) => {
    try {
      const result = await API.graphql(graphqlOperation(createStudent, { input: studentData }));
      return result.data.createStudent;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  getStudents: async () => {
    try {
      const result = await API.graphql(graphqlOperation(listStudents));
      return result.data.listStudents.items;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  getStudent: async (id) => {
    try {
      const result = await API.graphql(graphqlOperation(getStudent, { id }));
      return result.data.getStudent;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  },

  updateStudent: async (studentData) => {
    try {
      const result = await API.graphql(graphqlOperation(updateStudent, { input: studentData }));
      return result.data.updateStudent;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const result = await API.graphql(graphqlOperation(deleteStudent, { input: { id } }));
      return result.data.deleteStudent;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
};
