import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import "./assets/css/util.css";
import "./assets/css/argon-dashboard-pro-react.css";
import "./assets/css/argon-dashboard-pro-react.css.map";
import "./assets/css/argon-dashboard-pro-react.min.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ApiDetail from "./pages/detail/ApiDetail";

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/:category"
             render={props => <ApiDetail {...props} />}/>

      <Route path="/"
             render={props => <App {...props} />}/>
      <Redirect from="*" to="/"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
