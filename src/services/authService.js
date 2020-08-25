import axios from "axios";

import { apiRouts } from "./../utils/routes";
import { getData } from "./dataService";

const options = {
    headers: { 
        'Content-Type': 'application/json',
        'authorization': `${getData("token_type")} ${getData("access_token")}`
    }
};

export const userLogin = ({ username, password }) => {
    return axios.post(apiRouts.user_login, {
        email: username,
        password: password
    });
}

export const userRegister = ({ email, name, mobile_no, password }) => {
    return axios.post(apiRouts.user_register, {
        email: email,
        name: name, 
        mobile_no: mobile_no,
        password: password
    });
}

export const adminLogin = ({ username, password }) => {
    return axios.post(apiRouts.admin_login, {
        email: username,
        password: password
    });
}

export const adminLogout = () => {
    return axios.post(apiRouts.admin_logout, {}, options);
}

export const logout = () => {
    return axios.post(apiRouts.logout, {}, options);
}