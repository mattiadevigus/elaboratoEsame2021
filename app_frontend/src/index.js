import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Particles from 'react-particles-js';
import App from './Components/Index/App';
import Session from './Components/Pages/Session';
import Login from './Components/Pages/Private/Login';
import Dashboard from './Components/Pages/Private/Dashboard';



let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <React.StrictMode>
    <section id="particleJS">
      {/* <Particsles
        params={{
          particles: {
            enable: true,
            move: {
              radius: 10,
              speed: 1
            },
          },
          color: {
            value: "#15151e"
          }
        }} /> */}
      <Router>
        <Switch>
          <Route exact path="/" component={() => <App />} />
          <Route exact path="/timing/:id" component={() => <Session />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/dashboard" component={() => <Dashboard />} />
          <App />
        </Switch>
      </Router>
    </section>
  </React.StrictMode>,
  document.getElementById('root')
);
