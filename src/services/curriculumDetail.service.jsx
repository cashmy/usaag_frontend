import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44319/api/curriculumDetail";

class CurriculumDetailService {

  getCurriculumDetails = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  getCurriculumDetailsbyTemplate = (headerId) => {
    return axios.get(API_URL + `/tempHeader/${headerId}`, { headers: authHeader() });
  };

  addCurriculumDetail = (data) => {
    return axios.post(API_URL + `/${data.themeId}`, data, { headers: authHeader() });
  };

  updateCurriculumDetail = (data) => {
    axios
      .put(API_URL + `/${data.themeId}/${data.id}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  };

  deleteCurriculumDetail = (themeId, id) => {
    return axios.delete(API_URL + `/${themeId}/${id}`, { headers: authHeader() });
  }
}

export default new CurriculumDetailService();