//Core
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionItem from '../../components/Transactions/TransactionItem';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
//Utils
// import prettyNumber from '../../utils/prettyNumber';

export default function TransactionsScreen({ navigation }) {
	const dispatch = useDispatch();
	const { items: transactions, categories } = useSelector(state => state.transactions);

	const removeTransaction = transactionId =>
		dispatch(transactionsOperations.removeTransaction({ transactionId }));

	const renderItem = ({ item }) => {
		const { transactionDate, type, categoryId, comment, amount, balanceAfter, id } = item;

		const prettyDate = new Date(transactionDate).toLocaleDateString();

		const category = categories.find(({ id }) => id === categoryId);

		const props = {
			id,
			type,
			amount: amount.toLocaleString('ua-UA', { minimumFractionDigits: 2 }),
			comment,
			prettyDate,
			balanceAfter: balanceAfter.toLocaleString('ua-UA', { minimumFractionDigits: 2 }),
			categoryName: category?.name,
		};

		return <TransactionItem props={props} onRemoveTransaction={removeTransaction} />;
	};

	const memoTransactions = useMemo(
		() =>
			[...transactions]
				.sort((a, b) => Date.parse(b.balanceAfter) - Date.parse(a.balanceAfter))
				.sort((a, b) => Date.parse(b.transactionDate) - Date.parse(a.transactionDate)),
		[transactions],
	);

	const balance = memoTransactions[0]?.balanceAfter.toLocaleString('ua-UA', {
		minimumFractionDigits: 2,
	});

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<View style={styles.balanceWrap}>
					<Text style={styles.balance}>Ваш баланс:</Text>
					<Text style={styles.balance}>₴ {balance || '0.00'}</Text>
				</View>

				<FlatList data={memoTransactions} renderItem={renderItem} keyExtractor={item => item.id} />

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
		backgroundColor: '#24CCA7',
	},

	addBtnLabel: {
		textAlign: 'center',
		fontSize: 20,
		color: '#fff',
		paddingVertical: 5,
	},
});
