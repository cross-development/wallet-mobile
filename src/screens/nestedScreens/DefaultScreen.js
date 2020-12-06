//Core
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../../components/Transactions/TransactionItem';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
//Utils
import prettyNumber from '../../utils/prettyNumber';

export default function TransactionsScreen({ navigation }) {
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

		const category = categories.find(({ id }) => id === categoryId);

		const props = {
			id,
			type,
			amount: prettyNumber.getPrettyNumber(amount),
			comment,
			prettyDate,
			balanceAfter: prettyNumber.getPrettyNumber(balanceAfter),
			categoryName: category?.name,
		};

		return <TransactionItem props={props} onRemoveTransaction={removeTransaction} />;
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<View style={styles.balanceWrap}>
					<Text style={styles.balance}>Ваш баланс:</Text>
					<Text style={styles.balance}>₴ {prettyNumber.getPrettyNumber(balance)}</Text>
				</View>

				<FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.id} />

				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.addBtn}
					onPress={() => navigation.navigate('FormScreen')}
				>
					<Text style={styles.addBtnLabel}>+</Text>
				</TouchableOpacity>
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

	addBtn: {
		width: 100,
		position: 'absolute',
		bottom: 10,
		right: '37%',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: '#507bfc',
	},

	addBtnLabel: {
		textAlign: 'center',
		fontSize: 20,
		color: '#fff',
		paddingVertical: 5,
	},
});
