import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44319/api/curriculumTypes";

class CurriculumTypesService {
  // Activate this next endpoint only if needed
  // getAllCurriculumTypes = () => {
  //   return axios.get(API_URL, { headers: authHeader() });
  // };

  getCurriculumTypesBySts = (status) => {
    return axios.get(API_URL + `/archive/${status}`, { headers: authHeader() });
  };

  getCurriculumType = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addCurriculumType = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateCurriculumType = (data) => {
    axios
      .put(API_URL + `/${data.Id}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  };

  patchCurriculumTypeSts = (id, sts) => {
    let data = {
      'archived': sts
    }
    axios
      .patch(API_URL + `/${id}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  // ! Add only after Authorization and Administrative roles have been implemented
  // deleteCurriculumDetail = (id) => {
  //   return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  // }
}

export default new CurriculumTypesService();