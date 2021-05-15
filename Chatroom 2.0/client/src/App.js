import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/BeforeJoining/LoginPage";
import RegisterPage from "./components/BeforeJoining/RegisterPage";
import Error404 from "./components/BeforeJoining/Error404";
import ActivationPage from "./components/BeforeJoining/ActivationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/AfterJoined/Home";

const App = () => {
  const logged = useSelector(state => state.Login);
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/user/activate/:token/:name" component={ActivationPage} />
      <ProtectedRoute path="/home" component={Home} logged={logged} />
      <Route path="*" component={Error404} />
    </Switch>
  )
}

export default App

