import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./utils/routes";

import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BirdsList from "./components/birds/BirdsList";
import BirdsForm from "./components/birds/BirdsForm";
import Users from "./components/users/Users";

function App() {  
  const [ role, setRole ] = useState(null);
  return (
    <main className="container-fluid">
      <Navbar />
      <Switch>
        <Route
          path={routes.login}
          render={(props) => <Login {...props} userType="user" />}
        />
        <Route
          path={routes.admin_login}
          render={(props) => <Login {...props} userType="admin" />}
        />
        <Route
          path={routes.register}
          render={(props) => <Register {...props} />}
        />
        <Route
          path={routes.bird_unverified_list}
          key="unverified_bird_list"
          exact
          render={(props) => <BirdsList {...props} type="unverified" />}
        />
        <Route
          path={routes.bird_list}
          key="verified_bird_list"
          exact
          render={(props) => <BirdsList {...props} />}
        />
        <Route
          path={routes.bird_create}
          exact
          render={(props) => <BirdsForm {...props} type="create" />}
        />
        <Route
          path={routes.users}
          exact
          render={(props) => <Users {...props} />}
        />
        <Redirect to={routes.login} />
      </Switch>
    </main>
  );
}

export default App;
