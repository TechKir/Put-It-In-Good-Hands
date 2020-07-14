import React, {createContext, useState} from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import LogOut from './components/LogOut';

export const AuthContext = createContext(null)

function App() {
  const [user, sUser] = useState(null);
  const setUser = (value) => {
    sUser(value)
  }
  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/logout' component={LogOut}/>
        </Switch>
      </HashRouter>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
