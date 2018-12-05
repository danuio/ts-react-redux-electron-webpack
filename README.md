# ts-react-redux-electron
Boilerplate for an Electron application written in Typescript with React.JS and Redux for state management. Also has hot-reloading for swift developement.

## Getting Started
To run a development server with `webpack-dev-server`. Use the command

```console
npm run start:dev
```

To launch `electron` client run

```console
npm run start:electron
```

## API Explanation

Most actions in redux require you to `init` a process which will set an `isLoading` attribute of that `reducer` to `true`. Then it will follow with a `success` or `failure` and maybe even a `reset`. To incorporate this in, I have created a simple framework to quickly generate these action handlers and the underlying actions.

### Action Classes
These classes will handle all `redux-thunk` actions for every `reducer`.

```typescript
import {CustomThunkAction} from "../common/Handlers";

import Actions from "../common/Actions";

// Should extend the base Actions class
class Template extends Actions {

    constructor() {

        // argument is an identifier for generating action types
        // to keep them unique
        // this can be anything but I chose to use the classes name
        super(Template.name);

        // any prefixes for an action
        // setting a prefix will automatically generate the action types
        // for example is this case the generated types will be
        // Types:
        // TEST_<IDENTIFIER>_INIT
        // TEST_<IDENTIFIER>_SUCCESS
        // TEST_<IDENTIFIER>_FAILURE
        // TEST_<IDENTIFIER>_RESET
        this.prefixes = [
            'TEST',
        ];

    }

    // this function is a thunk action to handle the process
    // the return type is CustomThunkAction<SUCCESS_RESPONSE_TYPE, FAILURE_RESPONSE_TYPE, RETURN_TYPE>
    public handleTest = (): CustomThunkAction<number, string, void> => (dispatch) => {

        // .handlers<SUCCESS_TYPE, FAILURE_TYPE>(<PREFIX>) will generate the action handlers for the
        // action type with prefix 'TEST'
        const {init, success, failure} = this.handlers<number, string>('TEST');

        // you can do your flow here
        dispatch(init());
        dispatch(success(123));
        dispatch(failure('hello'));
    };

}
```

### Reducer Classes
The reducer logic for `SimpleActionHandlers`.

```typescript
import {combineReducers} from "redux";

import BasicReducerFactory, {BasicReducerState} from "../common/BasicReducer";
import Template from "../actions/Template";


// defining typing for our TemplateReducer
export interface TemplateReducerState {

    // BasicReducer is a generic type which takes who arguments
    // which are the type of the response of success and failure
    test: BasicReducerState<number, string>;

}

// create a new Template action instance
const template = new Template();

// pre-filling the Actions class type before using it to make it easier
const SimpleReducer = <T1, T2>(prefix: string, initial?: BasicReducerState<T1, T2>) => {
    return BasicReducerFactory<Template, T1, T2>(template, prefix, initial);
};

// our TemplateReducer
const TemplateReducer = combineReducers({

    // SimpleReducer is predefined in 'common/Reducer.ts'
    // this takes two arguments which again are the types of the success response
    // and the types of failure response
    test: SimpleReducer<number, string>('TEST')

});

export default TemplateReducer;
```

### Accessing Reducer States

To access the state of a particular reducer, in our case the state of `TemplateReducer`, you have to specify it in the `mapStoreToProps` function of any component.

```typescript
const mapStoreToProps = (store: Store) => ({
    // boolean
    isLoading: store.template.test.isLoading
    // number
    response: store.template.test.response
    // string
    error: store.template.test.error
});
```

Types of each of the attributes of the `SimpleReducer` is as defined in the reducer file `(SimpleReducer<number, string>)`.
