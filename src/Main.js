//Core
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Components
import { NavigationContainer } from '@react-navigation/native';
import AppBar from './components/AppBar';
//Router
import { useRoute } from './router/router';
//Redux
import { authOperations } from './redux/auth';
import { transactionsOperations } from './redux/transactions';

const Main = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);

	useEffect(() => dispatch(authOperations.getCurrentUser()), [dispatch]);

	useEffect(() => {
		if (user) {
			dispatch(transactionsOperations.getTransactions());
			dispatch(transactionsOperations.getTransactionCategories());
		}
	}, [dispatch, user]);

	const routing = useRoute(user);

	return (
		<NavigationContainer>
			{user && <AppBar />}

			{routing}
		</NavigationContainer>
	);
};

export default Main;
