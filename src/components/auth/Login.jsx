import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";

import { setData, getData, resetData } from "./../../services/dataService";
import { userLogin, adminLogin } from "./../../services/authService";
import Input from "./../shared/Input";
import Card from "./../shared/Card";

const Login = ({ history, userType }) => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState({email: "", password: "", login: ""});

  useEffect(() => {
    const token = getData('access_token');
    if(token != undefined || token != null) history.push("/birds");
  });

  const handleSuccess = (response) => {
    if(response.status === 200){
      let { token_type, access_token, role, user } = response.data.result;
      setData("token_type", token_type);
      setData("access_token", access_token);
      setData("role", role);
      setData("user", user);
      history.push("/birds");
    }
  }

  const handleError = (error) => {
    if(error.status === 400){
      let { login, email, password} = error.data.error;
      console.log(error.data.error, error.data);
      setErrors({
        login: (login != undefined) ? login : "",
        username: email,
        password: password
      });
    }else { 
      resetData();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateCridentials(username, password);
    if(errors) return setErrors(errors);
    setErrors({email: "", password: ""});

    if(userType == "user"){
      userLogin({ username: username, password: password})
      .then(httpResponse => handleSuccess(httpResponse))
      .catch(httpResponse => handleError(httpResponse.response));
    }else {
      adminLogin({ username: username, password: password})
      .then(httpResponse => handleSuccess(httpResponse))
      .catch(httpResponse => handleError(httpResponse.response));
    }
  }

  const validateCridentials = (username, password) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(3).max(30).required()
    });
    const {error} = schema.validate({ username: username, password:  password }, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <Card title={userType + " Login"} error={errors.login}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Input name="email" label="Email" placeholder="Enter your email" error={errors.username} onChange={e => setUsername(e.target.value)} />
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
 
export default Login;