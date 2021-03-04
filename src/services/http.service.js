import axios from 'axios'
import authHeader from './authHeader.service';
import { API_URL } from "../components/constant/Constants"


class Http {
    save(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() });
    }
    update(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() });
    }
    delete(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() });
    }
    list(path) {
        return axios.get(API_URL + path, { headers: authHeader() });
    }
    select(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() });
    }
    get(path) {
        return axios.get(API_URL + path, { headers: authHeader() });
    }
    get(path,data) {
        return axios.get(API_URL + path, { headers: authHeader() , params : {'param':data} });
    }
}
export default new Http();