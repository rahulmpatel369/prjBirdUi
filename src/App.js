import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./utils/routes";

import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import BirdsList from "./components/birds/BirdsList";
import BirdsForm from "./components/birds/BirdsForm";

function App() {
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
          path={routes.bird_list}
          exact
          render={(props) => <BirdsList {...props} />}
        />
        <Route
          path={routes.bird_create}
          exact
          render={(props) => <BirdsForm {...props} type="create" />}
        />
        <Redirect to={routes.login} />
      </Switch>
    </main>
  );
}

export default App;
