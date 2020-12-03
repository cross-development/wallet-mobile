//Core
import axios from 'axios';
//Redux
import transactionsActions from './transactionsActions';

axios.defaults.baseURL = 'https://sheltered-sea-54747.herokuapp.com';

const addTransaction = ({ transaction }) => dispatch => {
	dispatch(transactionsActions.addTransactionRequest());

	axios
		.post('/api/transactions', transaction)
		.then(({ data }) => dispatch(transactionsActions.addTransactionSuccess(data)))
		.catch(error => dispatch(transactionsActions.addTransactionFailure(error)));
};

const getTransactions = () => dispatch => {
	dispatch(transactionsActions.getTransactionsRequest());

	axios
		.get('/api/transactions')
		.then(({ data }) => dispatch(transactionsActions.getTransactionsSuccess(data)))
		.catch(error => dispatch(transactionsActions.getTransactionsFailure(error)));
};

const updateTransaction = transactionId => dispatch => {
	dispatch(transactionsActions.updateTransactionRequest());

	axios
		.patch(`/api/transactions/${transactionId}`)
		.then(() => dispatch(transactionsActions.updateTransactionSuccess(transactionId)))
		.catch(error => dispatch(transactionsActions.updateTransactionFailure(error)));

	// {
	// 	"transactionDate": "string",
	// 	"type": "INCOME",
	// 	"categoryId": "string",
	// 	"comment": "string",
	// 	"amount": 0
	//   }
};

const removeTransaction = ({ transactionId }) => dispatch => {
	dispatch(transactionsActions.removeTransactionRequest());

	axios
		.delete(`/api/transactions/${transactionId}`)
		.then(() => dispatch(transactionsActions.removeTransactionSuccess(transactionId)))
		.catch(error => dispatch(transactionsActions.removeTransactionFailure(error)));
};

const getTransactionCategories = () => dispatch => {
	dispatch(transactionsActions.getTransactionCategoryRequest());

	axios
		.get('/api/transaction-categories')
		.then(({ data }) => dispatch(transactionsActions.getTransactionCategorySuccess(data)))
		.catch(error => dispatch(transactionsActions.getTransactionCategoryFailure(error)));
};

const getTransactionsSummary = (month, year) => dispatch => {
	dispatch(transactionsActions.getTransactionsSummaryRequest());

	axios
		.get(`/api/transactions-summary?month=${month}&year=${year}`)
		.then(({ data }) => dispatch(transactionsActions.getTransactionsSummarySuccess(data)))
		.catch(error => dispatch(transactionsActions.getTransactionsSummaryFailure(error)));
};

const transactionsOperations = {
	addTransaction,
	getTransactions,
	updateTransaction,
	removeTransaction,

	getTransactionCategories,
	getTransactionsSummary,
};

export default transactionsOperations;
