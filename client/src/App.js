import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";



//components

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import UpdatePage from "./pages/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Admin from "./pages/Admin";

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {

      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Fragment>
      <RestaurantsContextProvider>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
              <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
              <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
              <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
              <Route exact path="/restaurants/:id/update" component={UpdatePage} />
            </Switch>
          </div>
        </Router>
      </RestaurantsContextProvider>
    </Fragment>
  )
}

export default App;
