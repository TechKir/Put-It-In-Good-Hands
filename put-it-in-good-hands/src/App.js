import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login}/>
          <Route path='/registration' component={Registration}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
