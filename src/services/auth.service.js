import axios from "axios";
import { API_URL } from "../components/constant/Constants"

class AuthService {

  async login(userInfo) {
    return axios.post(API_URL + "logIn", userInfo)
      .then(response => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout = () => {
    let logout = localStorage.removeItem("user");
    return logout;
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  isLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return true;
    }
    return false;
  }

  isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // let roles = JSON.parse(user.role);
    let roles = user.role.split(",").map(String);
    let adminStatus = false;
    console.log("roles "+roles);
    roles.map((role,index)=>{
          if(role === 'ADMIN'){
            console.log("role "+role);
            adminStatus =  true;
          }
        }
    )
    return adminStatus;
  }
}

export default new AuthService();
