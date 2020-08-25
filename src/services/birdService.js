import axios from "axios";

import { apiRouts } from "./../utils/routes";
import { getData } from "./dataService";

const options = {
    headers: { 
        'Content-Type': 'application/json',
        'authorization': `${getData("token_type")} ${getData("access_token")}`
    }
};

export const getBirds = () => {
    return axios.get(apiRouts.bird_list);
}

export const getUnverifiedBirds = () => {
    return axios.get(apiRouts.bird_unverified_list);
}

export const createBird = ({ local_name, image, extension, residential_status, diet }) => {
    return axios.post(apiRouts.bird_create, {
            local_name: local_name,
            image: image,
            extension: extension,
            residential_status: residential_status,
            diet: diet,
        }, 
        options
    );
}

export const verifyBird = (birdId) => {
    return axios.post(`${apiRouts.bird_verify.replace("{bird_id}", birdId)}?status=verified`, {}, options);
}