import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage/HomePage.component';
import Header from "./components/header/header.component";

class App extends React.Component {


  render() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
            </Switch>
        </div>
    );
  }
}

export default App;
