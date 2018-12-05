import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {InjectedAlertProp} from "react-alert";
import {applyMiddleware, combineReducers, createStore} from "redux";

import TemplateReducer, {TemplateReducerState} from '../reducers/Template'

export interface DefaultProps {
    alert: InjectedAlertProp;

    [key: string]: any;
}

export interface Store {
    template: TemplateReducerState
}

const rootReducer = combineReducers({
    template: TemplateReducer
});

const middleware = [thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;