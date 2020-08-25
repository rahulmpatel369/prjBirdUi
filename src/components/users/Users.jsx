import React, { useState, useEffect } from "react";

import { getUsers, getRoles, updateUserRole } from "./../../services/userService";
import { generateNotification } from "./../../services/notificationService";
import { handleHttpError } from "./../../services/httpErrorService";

const Login = ({ history, userType }) => {
  const [ users, setUsers ] = useState([]);
  const [ roles, setRoles ] = useState([]);

  useEffect(() => {
    getUsers()
    .then(httpResponse => handleGetUsersSuccess(httpResponse))
    .catch(httpResponse => handleHttpError(httpResponse.response));
    getRoles()
    .then(httpResponse => handleGetRolesSuccess(httpResponse))
    .catch(httpResponse => handleHttpError(httpResponse.response));
  }, []);

  const handleGetUsersSuccess = (response) => {
    if(response.status === 200){
        const users = response.data.result;
        setUsers(users);
    }
  }

  const handleGetRolesSuccess = (response) => {
    if(response.status == 200) { 
      const roles = response.data.result;
      setRoles(roles);
    }
  }

  const handleUpdateRolesSuccess = (response) => {
    if(response.status == 200) { 
      generateNotification({title: "Role Updated", text: "", icon: "success"});      
      getUsers()
      .then(httpResponse => handleGetUsersSuccess(httpResponse))
      .catch(httpResponse => handleHttpError(httpResponse.response));
    }
  }

  const updateRole = (userId, roleId) => {
    if(roleId == "")return;
    updateUserRole(userId, roleId)
    .then(httpResponse => handleUpdateRolesSuccess(httpResponse))
    .catch(httpResponse => handleHttpError(httpResponse.response));
  }

  return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <table className="table table-borderd">
                <thead>
                    <tr>
                        <td>Sr No</td>
                        <td>Full Name</td>
                        <td>Mobile No</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>Update Role To</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => {
                      return <tr key={user.id}>
                          <td>{key + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.mobile_no}</td>
                          <td>{user.email}</td>
                          <td>{user.role.name}</td>
                          <td>
                            <select className="form-control" onChange={e => updateRole(user.id, e.target.value)}>
                              <option value="">Select Role</option>
                              {roles.map((role, key) => {
                                return <option value={role.id} key={key}>
                                  {role.name}
                                </option>
                              })}
                            </select>
                          </td>
                        </tr>
                    })}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
 
export default Login;