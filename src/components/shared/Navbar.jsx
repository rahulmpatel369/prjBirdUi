import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from './../../utils/routes';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Birds</span>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.bird_list} activeclassname="active"> Birds </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.bird_create} > New Bird Entry </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.login} > Login </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.login} > Register </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;