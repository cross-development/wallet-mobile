//Core
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
//Router
import { useRoute } from './router/router';
//Redux
import { authOperations } from './redux/auth';
import { transactionsOperations } from './redux/transactions';

const Main = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);

	useEffect(() => dispatch(authOperations.getCurrentUser()), []);

	useEffect(() => {
		if (user) {
			dispatch(transactionsOperations.getTransactions());
			dispatch(transactionsOperations.getTransactionCategories());
		}
	}, [dispatch, user]);

	const routing = useRoute(user);

	return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
