import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44319/api/cohorts";

class CohortService {
  getAllCohorts = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getCohortsBySts = (status) =>{
    return axios.get(API_URL + `/archive/${status}`, {headers: authHeader() });
  };

  getCohort = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addCohort = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateCohort = (data) => {
    axios
      .put(API_URL + `/${data.clinicId}`, data, { headers: authHeader() })
      .then((response) => {
          if (response.data) {
              console.log("Response: ", response.data)
          }

          return response.data;
      });
  };

  deleteCohort = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new CohortService();