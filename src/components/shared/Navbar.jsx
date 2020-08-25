import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from './../../utils/routes';
import { getRole, resetData } from './../../services/dataService';
import { logout as userLogout, adminLogout } from './../../services/authService';
import { handleHttpError } from './../../services/httpErrorService';

const Navbar = () => {
    const logout = () => {
        if(getRole() !== "admin"){
            userLogout()
            .then((httpResponse) => {
                if(httpResponse.status == 200) {
                    resetData();

                    window.location.reload(false);
                }
            })
            .catch(httpResponse => {
                handleHttpError(httpResponse.response);
            });
        }else {
            adminLogout()
            .then((httpResponse) => {
                if(httpResponse.status == 200) {
                    resetData();
                    window.location.reload(false);
                }
            })
            .catch(httpResponse => {
                handleHttpError(httpResponse.response);
            });
        }
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Birds</span>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    { (getRole() === "admin") && 
                        <li className="nav-item">
                            <Link className="nav-link" to={routes.users} activeclassname="active"> Users </Link>
                        </li>
                    }
                    { (getRole() === "moderator") && 
                        <li className="nav-item">
                            <Link className="nav-link" to={routes.bird_unverified_list} activeclassname="active"> Un-Verified Birds </Link>
                        </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.bird_list} activeclassname="active"> Birds </Link>
                    </li>
                    { (getRole() === "volunteer") && 
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.bird_create} > New Bird Entry </Link>
                    </li>                        
                    }
                    { (getRole() === null) && 
                        <li className="nav-item">
                            <Link className="nav-link" to={routes.login} > Login </Link>
                        </li>
                    }   
                    { (getRole() === null) && 
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.register} > Register </Link>
                    </li>
                    }      
                    { (getRole() !== null) && 
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={e => logout()} > Logout </button>
                    </li>
                    }
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;