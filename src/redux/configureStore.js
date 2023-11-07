import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";
import sagas from './sagas';

const store = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck:false,
		}).prepend(sagaMiddleware)
	});

	sagaMiddleware.run(sagas);
	return { store };
};

export default store;