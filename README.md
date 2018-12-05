# ts-react-redux-electron
Boilerplate for an Electron application written in Typescript with React.JS and Redux for state management

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
