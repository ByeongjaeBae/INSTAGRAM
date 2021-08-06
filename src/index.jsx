import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// eslint-disable-next-line import/extensions
import '@fortawesome/fontawesome-free/js/all.js';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './modules';
import authService from './service/auth';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App authService={authService} />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
