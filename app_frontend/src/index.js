import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './Components/Index/App';
import Session from './Components/Pages/Session';
import Login from './Components/Pages/Private/Login';
import Dashboard from './Components/Pages/Private/Dashboard';
import Timetable from './Components/Pages/Private/Timetable';


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <React.StrictMode>
    <section id="particleJS">
      <Router>
        <Switch>
          <Route exact path="/" component={() => <App />} />
          <Route exact path="/sessionDetail/:id" component={() => <Session />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/dashboard" component={() => <Dashboard />} />
          <Route exact path="/timetable" component={() => <Timetable />} />
          <App />
        </Switch>
      </Router>
    </section>
  </React.StrictMode>,
  document.getElementById('root')
);
