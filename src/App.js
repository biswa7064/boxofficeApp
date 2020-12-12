import React from 'react';
import {Switch, Route } from 'react-router-dom'
import Navs from './components/Navs';
import Home from './pages/Home';
import Start from './pages/Start';

function App() {
  
  return (
    <div>
      <Navs/>
    <Switch>
      <Route exact path = "/">
        <Home />
      </Route>
      <Route  path = "/start">
        <Start />
      </Route>
      <Route>404 Not Found</Route>
    </Switch>
    </div>
  );
}

export default App;
