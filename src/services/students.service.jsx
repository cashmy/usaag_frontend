import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44319/api/students";

class StudentService {
  getAllStudents = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getUnassignedStudents = () => {
    return axios.get(API_URL + '/unassigned', { headers: authHeader() })
  };

  getStudentssBySts = (status) => {
    return axios.get(API_URL + `/archive/${status}`, { headers: authHeader() });
  };

  getStudent = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addStudent = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateStudent = (data) => {
    axios
      .put(API_URL + `/${data.id}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  };

  patchStudentSts = (id, sts) => {
    let data = {
      'archived': sts
    }
    axios
      .patch(API_URL + `/${id}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteStudent = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new StudentService();