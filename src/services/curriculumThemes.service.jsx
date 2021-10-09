import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44319/api/curriculumThemes";

class CurriculumThemesService {
  getAllCurriculumThemes = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getCurriculumThemesBySts = (status) =>{
    return axios.get(API_URL + `/archive/${status}`, {headers: authHeader() });
  };

  getCurriculumTheme = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addCurriculumTheme = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateCurriculmTheme = (data) => {
    axios
      .put(API_URL + `/${data.id}`, data, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
  };

  patchCurriculumThemeSts = (id, sts) => {
    let data ={
      'archived': sts
    }
    axios
      .patch(API_URL + `/${id}`, data, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
  }

  deleteCurriculumThem = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new CurriculumThemesService();