import {ThunkAction, ThunkDispatch} from "redux-thunk";

import {Store} from "..";

export type InitHandler = () => {
    type: string;
}

export type ResetHandler = () => {
    type: string;
}

export type SuccessHandler<S> = (data: S) => {
    type: string,
    data: S
}

export type FailureHandler<F> = (data: F) => {
    type: string,
    data: F
}

export interface ActionCreatorHandlers<S, F> {
    init: InitHandler,
    success: SuccessHandler<S>,
    failure: FailureHandler<F>
    reset: ResetHandler
}

export interface CustomAction<S, F> {
    type: string,
    data?: S | F
}

export type CustomDispatch<S, F> = ThunkDispatch<Store, any, CustomAction<S, F>>;
export type CustomThunkAction<S, F, R = Promise<S>> = ThunkAction<R, Store, any, CustomAction<S, F>>;
export type CustomActionHandler<D, S, F, R> = (data?: D) => CustomThunkAction<S, F, R>;