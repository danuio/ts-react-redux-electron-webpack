import {combineReducers} from "redux";

import BasicReducerFactory, {BasicReducerState} from "../common/BasicReducer";
import Template from "../actions/Template";


export interface TemplateReducerState {
    test: BasicReducerState<number, string>;
}

const template = new Template();
const SimpleReducer = <T1, T2>(prefix: string, initial?: BasicReducerState<T1, T2>) => {
    return BasicReducerFactory<Template, T1, T2>(template, prefix, initial);
};

const TemplateReducer = combineReducers({
    test: SimpleReducer<number, string>('TEST')
});

export default TemplateReducer;