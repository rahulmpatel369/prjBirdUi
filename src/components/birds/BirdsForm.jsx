import React, {useState} from 'react';
import Input from '../shared/Input';
import ImageExtension from 'joi-image-extension';
import BaseJoi from "@hapi/joi";

const Joi = BaseJoi.extend(ImageExtension);

const BirdsForm = ({ history, type }) => {
    const [ localName, setLocalName ] = useState("");
    const [ image, setImage ] = useState("");
    const [ diet, setDiet ] = useState("");
    const [ residentialStatus, setResidentialStatus ] = useState("");
    const [ errors, setErrors ] = useState({localName: "", image: "", diet: "", residentialStatus: ""});

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateCridentials(localName, image, diet, residentialStatus);
        if(errors) return setErrors(errors);
        setErrors({email: "", password: ""});

        // if(userType == "user"){
        //     userLogin({ username: username, password: password})
        //     .then(httpResponse => handleSuccess(httpResponse))
        //     .catch(httpResponse => handleError(httpResponse.response));
        // }else {
        //     adminLogin({ username: username, password: password})
        //     .then(httpResponse => handleSuccess(httpResponse))
        //     .catch(httpResponse => handleError(httpResponse.response));
        // }
    }
    
    const validateCridentials = (localName, image, diet, residentialStatus) => {
        const schema = Joi.object({
            localName: Joi.string().min(3).max(30).required().label("Local Name"),
            image: Joi.image().required().label("Bird image"),
            diet: Joi.string().min(3).max(30).required().label("Bird Diet"),
            residentialStatus: Joi.string().min(3).max(30).required().label("Bird Residential Status"),
        });
        const {error} = schema.validate({ localName, image, diet, residentialStatus }, { abortEarly: false });
        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    }

    return (
        <div className="row mt-2">
            <div className="col-md-12">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Input name="local_name" label="Bird Local Name" placeholder="Enter Local Name" error={errors.localName} onChange={e => setLocalName(e.target.value)} />
                    <Input type="file" name="image" label="Bird image" error={errors.image} onChange={e => setImage(e.target.value)} />
                    <Input name="diet" label="Bird Diet" placeholder="Enter Bird Diet" error={errors.diet} onChange={e => setLocalName(e.target.value)} />
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