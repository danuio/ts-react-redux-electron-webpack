import { all, takeLatest } from 'redux-saga/effects';

import { accountsDecryptWorker } from '../workers/Template';

import Accounts from '../../actions/Template';

const accounts = new Accounts();

function* accountsDecryptInitWatcher() {
	yield takeLatest(accounts.actions.decrypt.init, accountsDecryptWorker);
}

export default function*() {
	yield all([accountsDecryptInitWatcher()]);
}
