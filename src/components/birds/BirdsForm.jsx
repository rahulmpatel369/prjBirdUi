import React, {useState} from 'react';
import Input from '../shared/Input';
import Joi from "@hapi/joi";

import { createBird } from "./../../services/birdService";
import { generateNotification } from "./../../services/notificationService";

const BirdsForm = ({ history, type }) => {
    const [ localName, setLocalName ] = useState("");
    const [ image ] = useState({ file: "", imagePreviewUrl: "", extension: "" });
    const [ diet, setDiet ] = useState("");
    const [ residentialStatus, setResidentialStatus ] = useState("");
    const [ errors, setErrors ] = useState({localName: "", image: "", diet: "", residentialStatus: ""});

    const setImage = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            image.file = file;
            image.imagePreviewUrl = reader.result;
            image.extension = file.name.split('.')[file.name.split('.').length - 1];
        }

        reader.readAsDataURL(file); 
    }

    const handleSuccess = (response) => {
        if(response.status === 200){
            generateNotification({title: "Bird created successfully..", text: "", icon: "success"});
        }
    }

    const handleError = (error) => {
        if(error && error.status === 400){          
            let { local_name, image, extension, residential_status, diet } = error.data.error;
            setErrors({
                localName: (local_name != undefined) ? local_name : "",
                image: (image != undefined) ? image  : "",
                residentialStatus: (residential_status != undefined) ? residential_status : "",
                diet: (diet != undefined) ? diet : "",
            });
        }else {
            generateNotification({title: "Something Went Wrong!", text: "", icon: "error"});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateBird(localName, image, diet, residentialStatus);
        if(errors) return setErrors(errors);
        setErrors({localName: "", image: "", diet: "", residentialStatus: ""});

        if(type == "create"){
            createBird({ local_name: localName, image: image.imagePreviewUrl.split(',')[1], diet: diet, residential_status: residentialStatus, extension: image.extension})
            .then(httpResponse => handleSuccess(httpResponse))
            .catch(httpResponse => handleError(httpResponse.response));
        }else {
            // Update Bird Code
        }
    }
    
    const validateBird = (localName, image, diet, residentialStatus) => {
        const schema = Joi.object({
            localName: Joi.string().min(3).max(255).required().label("Local Name"),
            image: Joi.any().required().label("Bird image"),
            diet: Joi.string().min(3).max(255).required().label("Bird Diet"),
            residentialStatus: Joi.string().min(3).max(255).required().label("Bird Residential Status"),
        });
        const {error} = schema.validate({ localName, image, diet, residentialStatus }, { abortEarly: false });
        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }

    return (
        <div className="row justify-content-md-center mt-2">
            <div className="col col-lg-6">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Input name="local_name" label="Bird Local Name" placeholder="Enter Local Name" error={errors.localName} onChange={e => setLocalName(e.target.value)} />
                    <Input type="file" name="image" label="Bird image" error={errors.image} onChange={e => setImage(e)} />
                    <Input name="diet" label="Bird Diet" placeholder="Enter Bird Diet" error={errors.diet} onChange={e => setDiet(e.target.value)} />
                    <Input name="residential_status" label="Bird Residential Status" placeholder="Enter Bird Residential Status" error={errors.residentialStatus} onChange={e => setResidentialStatus(e.target.value)} />
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block"> Login </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default BirdsForm;