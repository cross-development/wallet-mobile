//Core
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';

export default function TransactionsScreen() {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { items: transactions, categories } = useSelector(state => state.transactions);

	// const category = useMemo(() => categories.find(({ id }) => id === categoryId), [
	// 	categories,
	// 	categoryId,
	// ]);

	const removeTransaction = transactionId =>
		dispatch(transactionsOperations.removeTransaction({ transactionId }));

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.container}>
				<View style={styles.currentBalance}>
					<Text style={styles.balance}>Баланс:</Text>
					<Text style={styles.balance}>₴ {user.balance}</Text>
				</View>

				<FlatList
					data={transactions}
					renderItem={({ item }) => (
						<View style={styles.transactionContainer(item.type)}>
							<View style={styles.tableRow}>
								<Text style={styles.rowTitle}>Дата</Text>
								<Text>{item.transactionDate}</Text>
							</View>
							<View style={styles.tableRow}>
								<Text style={styles.rowTitle}>Тип</Text>
								<Text>{item.type === 'INCOME' ? '+' : '-'}</Text>
							</View>
							<View style={styles.tableRow}>
								<Text style={styles.rowTitle}>Категория</Text>
								<Text>{item.categoryId}</Text>
							</View>
							<View style={styles.tableRow}>
								<Text style={styles.rowTitle}>Комментарий</Text>
								<Text>{item.comment}</Text>
							</View>
							<View style={styles.tableRow}>
								<Text style={styles.rowTitle}>Сумма</Text>
								<Text style={styles.amount(item.type)}>{item.amount}</Text>
							</View>
							<View style={styles.tableRow}>
								<Text style={styles.rowTitle}>Баланс</Text>
								<Text>{item.balanceAfter}</Text>
							</View>
							<View style={styles.deleteWrap}>
								<TouchableOpacity
									id={item.id}
									activeOpacity={0.8}
									style={styles.deleteBtn}
									onPress={() => removeTransaction(item.id)}
								>
									<Text style={styles.buttonLabel} nativeID={item.id}>
										Delete
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					keyExtractor={item => item.id}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E7EAF2',
	},

	currentBalance: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 10,
		marginTop: 10,
	},

	balance: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	transactionContainer: typeColor => ({
		borderRadius: 10,
		marginHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 10,
		backgroundColor: '#fff',
		borderLeftWidth: 10,
		borderLeftColor: typeColor === 'INCOME' ? '#24CCA7' : '#FF6596',
	}),

	amount: typeColor => ({
		color: typeColor === 'INCOME' ? '#24CCA7' : '#FF6596',
	}),

	tableRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 7,
		borderBottomWidth: 1,
		borderBottomColor: '#d0d0d0',
		paddingHorizontal: 15,
	},

	rowTitle: {
		fontWeight: '700',
	},

	deleteWrap: {
		justifyContent: 'flex-end',
		flexDirection: 'row',
		paddingTop: 15,
		paddingRight: 15,
	},

	deleteBtn: {
		backgroundColor: '#507bfc',
		borderRadius: 6,
		alignItems: 'center',
		width: 100,
		paddingVertical: 5,
	},

	buttonLabel: {
		color: '#fff',
		fontSize: 16,
		textAlignVertical: 'center',
	},
});
