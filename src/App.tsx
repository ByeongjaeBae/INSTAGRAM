import React from 'react';
import './App.css';
import StartPage from './components/Page/StartPage/StartPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Page/LoginPage/LoginPage';
import RegisterPage from './components/Page/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <StartPage></StartPage>
          </Route>
          <Route path="/accounts/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/accounts/signup">
            <RegisterPage></RegisterPage>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
