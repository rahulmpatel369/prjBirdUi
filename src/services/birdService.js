import axios from "axios";

import { apiRouts } from "./../utils/routes";

export const getBirds = () => {
    return axios.get(apiRouts.bird_list);
}

export const adminLogin = ({ username, password }) => {
    return axios.post(apiRouts.admin_login, {
        email: username,
        password: password
    });
}