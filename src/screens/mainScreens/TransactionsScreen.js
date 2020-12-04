//Core
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../../components/TransactionItem';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';

export default function TransactionsScreen() {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { items: transactions, categories } = useSelector(state => state.transactions);

	const currentBalance = transactions.length
		? transactions[transactions.length - 1].balanceAfter
		: user.balance;

	const balance = currentBalance.toLocaleString('ua-UA', { minimumFractionDigits: 2 });

	const removeTransaction = transactionId =>
		dispatch(transactionsOperations.removeTransaction({ transactionId }));

	const renderItem = ({ item }) => {
		const { transactionDate, type, categoryId, comment, amount, balanceAfter, id } = item;

		const prettyDate = new Date(transactionDate).toLocaleDateString();
		const prettyAmount = amount.toLocaleString('ua-UA', { minimumFractionDigits: 2 });
		const prettyBalance = balanceAfter.toLocaleString('ua-UA', { minimumFractionDigits: 2 });

		const category = categories.find(({ id }) => id === categoryId);

		const props = {
			id,
			type,
			comment,
			prettyDate,
			prettyAmount,
			prettyBalance,
			categoryName: category?.name,
		};

		return <TransactionItem props={props} onRemoveTransaction={removeTransaction} />;
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<View style={styles.balanceWrap}>
					<Text style={styles.balance}>Ваш баланс:</Text>
					<Text style={styles.balance}>₴ {balance}</Text>
				</View>

				<FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.id} />
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E7EAF2',
	},

	balanceWrap: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginVertical: 10,
		marginHorizontal: 30,
		paddingVertical: 15,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},

	balance: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
