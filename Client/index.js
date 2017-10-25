import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { store } from './_helpers';
import { App } from './App';



render(
	const store = configureStore();
	persistStore(store);
    //<Provider store={store}>
        <App />
    //</Provider>,
    document.getElementById('app')
);
