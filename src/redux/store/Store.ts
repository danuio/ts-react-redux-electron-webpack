import logger from 'redux-logger';
import dynamicStorage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import TemplateReducer, { AccountsDecryptReducer } from '../reducers/Template';

import TemplateSagas from '../sagas/watchers/Template';

export interface Store {
	template: AccountsDecryptReducer;
}

const persistConfig: PersistConfig = {
	key: 'root',
	storage: dynamicStorage,
	whitelist: ['app']
};

const rootReducer = combineReducers({
	template: TemplateReducer
});

const saga = createSagaMiddleware();
const middleware = [saga, logger];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	const store = createStore(persistedReducer, applyMiddleware(...middleware));
	const persistor = persistStore(store);

	saga.run(TemplateSagas);

	return { store, persistor };
};
