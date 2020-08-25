import axios from "axios";

import { apiRouts } from "./../utils/routes";
import { getData } from "./dataService";

const options = {
    headers: { 
        'Content-Type': 'application/json',
        'authorization': `${getData("token_type")} ${getData("access_token")}`
    }
};

export const getUsers = () => {
    return axios.get(apiRouts.users, options);
}

export const getRoles = () => {
    return axios.get(apiRouts.roles, options);
}

export const updateUserRole = (userId, roleId) => {
    return axios.post(apiRouts.user_role_update.replace("{user_id}", userId).replace("{role_id}", roleId), {}, options);
}