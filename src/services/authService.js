import axios from "axios";

import { apiRouts } from "./../utils/routes";

export const userLogin = ({ username, password }) => {
    return axios.post(apiRouts.user_login, {
        email: username,
        password: password
    });
}

export const adminLogin = ({ username, password }) => {
    return axios.post(apiRouts.admin_login, {
        email: username,
        password: password
    });
}