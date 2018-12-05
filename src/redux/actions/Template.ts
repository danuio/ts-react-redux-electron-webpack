import {CustomThunkAction} from "../common/Handlers";

import Actions from "../common/Actions";

class Template extends Actions {
    constructor() {
        super(Template.name);
        this.prefixes = [
            'TEST',
        ];
    }

    public handleTest = (): CustomThunkAction<number, string, void> => (dispatch) => {
        const {init, success, failure} = this.handlers<number, string>('TEST');
        dispatch(init());
        dispatch(success(123));
        dispatch(failure('hello'));
    };
}

export default Template;