import Accounts from '../../actions/Template';

const accounts = new Accounts();

export function* accountsDecryptWorker(action: any) {
	try {
		yield null;
	} catch (e) {
		// pass
	}
}
