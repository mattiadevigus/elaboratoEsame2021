import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/Index/App';
import Session from './Components/Pages/Session'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={() => <App />} />
        <Route exact path="/session/:id" component={() => <Session />} />
        <App />
      </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);
