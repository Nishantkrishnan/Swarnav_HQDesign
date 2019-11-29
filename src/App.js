import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./Routes/Home";
import Facilities from "./Routes/Facilities"
import MyBookings from "./Routes/MyBookings"
import Dashboard from "./component/Dashboard"
import eg from "./Routes/eg"
import {BrowserRouter as Router,Route} from "react-router-dom"

class App extends React.Component {
  render() {
    return (
        <div className="sect">
          {/* <Servicess /> */}
          <Router>
          <Route path='/' component={Home} />

          </Router>
        </div>
    );
  }
}

export default App;
