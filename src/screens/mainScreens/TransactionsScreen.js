//Core
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
//Redux
import { useSelector } from 'react-redux';

export default function TransactionsScreen() {
	const { user } = useSelector(state => state.auth);
	const { items: transactions, categories } = useSelector(state => state.transactions);

	// const category = useMemo(() => categories.find(({ id }) => id === categoryId), [
	// 	categories,
	// 	categoryId,
	// ]);

	const removeTransaction = event => {
		event.persist();
		console.log(event);
	};
	// dispatch(transactionsOperations.removeTransaction(nativeID));

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
						<View style={styles.commentContainer}>
							<View>
								<Text>Дата</Text>
								<Text>{item.transactionDate}</Text>
							</View>
							<View>
								<Text>Тип</Text>
								<Text>{item.type === 'INCOME' ? '+' : '-'}</Text>
							</View>
							<View>
								<Text>Категория</Text>
								<Text>{item.categoryId}</Text>
							</View>
							<View>
								<Text>Комментарий</Text>
								<Text>{item.comment}</Text>
							</View>
							<View>
								<Text>Сумма</Text>
								<Text>{item.amount}</Text>
							</View>
							<View>
								<Text>Баланс</Text>
								<Text>{item.balanceAfter}</Text>
							</View>
							<View>
								<TouchableOpacity
									nativeID={item.id}
									activeOpacity={0.6}
									style={styles.removeBtn}
									onPress={removeTransaction}
								>
									<Text nativeID={item.id} style={styles.sendLabel}>
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
		backgroundColor: '#fff',
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

	commentContainer: {
		borderWidth: 1,
		borderColor: '#20b2aa',
		marginHorizontal: 10,
		padding: 10,
		marginBottom: 10,
	},
});

// const styles = StyleSheet.create({

// commentContainer: {
// 	borderWidth: 1,
// 	borderColor: '#20b2aa',
// 	marginHorizontal: 10,
// 	padding: 10,
// 	marginBottom: 10,
// },

// 	sendBtn: {
// 		marginHorizontal: 30,
// 		height: 40,
// 		borderWidth: 2,
// 		borderColor: '#20b2aa',
// 		borderRadius: 10,
// 		marginTop: 20,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		marginBottom: 30,
// 	},

// 	inputContainer: {
// 		marginHorizontal: 10,
// 		marginBottom: 20,
// 	},

// 	input: {
// 		height: 50,
// 		borderWidth: 1,
// 		borderColor: 'transparent',
// 		borderBottomColor: '#20b2aa',
// 	},

// 	sendLabel: {
// 		color: '#20b2aa',
// 		fontSize: 20,
// 	},
// });

// export default CommentsScreen;
