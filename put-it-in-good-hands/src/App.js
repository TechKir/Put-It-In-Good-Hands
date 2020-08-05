import React, {createContext, useState} from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import LogOut from './components/LogOut';
import LeaveThingsSection from './components/LeaveThingsSection/LeaveThingsSection.js';

export const AuthContext = createContext(null); 
//Czy ten null dalej tam jest pod useContext a my mozemy sobie wybierac po nim i tak value takie jakie sobie wprowadzimy? Czy null dalej tam jest a my korzystamy tylko z value ktore destrukturyzujemy?

function App() {
  const [isHome,setIsHome]=useState(false);
  const [isForm,setIsForm]=useState(false);
  const [isTogether, setIsTogether]=useState(false);
  // const setHome = () => setIsHome(false);

  const [user, sUser] = useState(null);
  const setUser = (value) => {
    sUser(value)
  }

  return (
    <AuthContext.Provider 
    value={{user,setUser,isHome,setIsHome, isForm, setIsForm, isTogether, setIsTogether}}>
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/login' component={Login}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/logout' component={LogOut}/>
            <Route path='/leave-things' component={LeaveThingsSection}/>
          </Switch>
        </HashRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
