import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";

import { setData, getData, resetData } from "./../../services/dataService";
import { userRegister } from "./../../services/authService";
import { generateNotification } from "./../../services/notificationService";

import Input from "./../shared/Input";
import Card from "./../shared/Card";

const Register = ({ history }) => {
  const [ email, setEmail ] = useState("");
  const [ name, setName ] = useState("");
  const [ mobileNo, setMobileNo ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState({email: "", name: "", mobileNo: "", password: ""});

  const handleSuccess = (response) => {
    if(response.status === 200){
      history.push("/login");
    }
  }

  const handleError = (error) => {
    if(error && error.status === 400){
      let { email, name, mobile_no, password} = error.data.error;
      setErrors({
        email: (email != undefined) ? email : "",
        name: (name != undefined) ? name : "",
        mobileNo: (mobile_no != undefined) ? mobile_no : "",
        password: (password != undefined) ? password : "",
      });
    }else { 
      resetData();
      generateNotification({title: "Something Went Wrong!", text: "Please Try Again Later", icon: "error"});
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateCridentials(email, name, mobileNo, password);
    if(errors) return setErrors(errors);
    setErrors({email: "", name: "", mobileNo: "", password: ""});

    userRegister({ email, name, mobile_no: mobileNo, password })
    .then(httpResponse => handleSuccess(httpResponse))
    .catch(httpResponse => handleError(httpResponse.response));
  }

  const validateCridentials = (email, name, mobileNo, password) => {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(3).max(30).required(),
      name: Joi.string().min(3).max(30).required().label("Full Name"),
      mobileNo: Joi.string().min(3).max(30).required().label("Mobile No"),
      password: Joi.string().min(3).max(30).required(),
    });
    const {error} = schema.validate({ email, name, mobileNo, password }, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <Card title="Register" error={errors.login}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Input name="name" label="Full Name" placeholder="Enter your Full Name" error={errors.name} onChange={e => setName(e.target.value)} />
                    <Input name="mobile_no" label="Full Mobile No" placeholder="Enter your Mobile No" error={errors.mobileNo} onChange={e => setMobileNo(e.target.value)} />
                    <Input name="email" label="Email" placeholder="Enter your email" error={errors.email} onChange={e => setEmail(e.target.value)} />
                    <Input type="password" name="password" label="Password" placeholder="Enter your password" error={errors.password} onChange={e => setPassword(e.target.value)} />
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Login </button>
                    </div>
                </form>
            </Card>
          </div>
        </div>
      </div>
    );
}
 
export default Register;