import { combineReducers } from 'redux';
import { IBasicReducer } from '../common/reducers/BasicReducerFactory';

import Accounts, { AccountsDecryptPayload } from '../actions/Template';

export type AccountsDecryptReducer = IBasicReducer<
	AccountsDecryptPayload,
	string,
	string
>;

export interface IAccountsReducer {
	decrypt: AccountsDecryptReducer;
}

const accounts = new Accounts();

const AccountsReducer = combineReducers({
	decrypt: accounts.SimpleReducer<AccountsDecryptPayload, string, string>(
		'Decrypt'
	)
});

export default AccountsReducer;
