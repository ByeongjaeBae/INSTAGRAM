import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from './components/Page/StartPage/StartPage';
import LoginPage from './components/Page/LoginPage/LoginPage';
import RegisterPage from './components/Page/RegisterPage/RegisterPage';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<StartPage />
					</Route>
					<Route path='/accounts/login'>
						<LoginPage />
					</Route>
					<Route path='/accounts/signup'>
						<RegisterPage />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
