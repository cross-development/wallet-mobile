//Core
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TransactionItem({ props, onRemoveTransaction }) {
	const { id, amount, categoryName, type, comment, balanceAfter, prettyDate } = props;

	return (
		<View style={styles.transactionContainer(type)}>
			<View style={styles.tableRow}>
				<Text style={styles.rowTitle}>Дата</Text>
				<Text>{prettyDate}</Text>
			</View>
			<View style={styles.tableRow}>
				<Text style={styles.rowTitle}>Тип</Text>
				<Text>{type === 'INCOME' ? '+' : '-'}</Text>
			</View>
			<View style={styles.tableRow}>
				<Text style={styles.rowTitle}>Категория</Text>
				<Text>{categoryName}</Text>
			</View>
			<View style={styles.tableRow}>
				<Text style={styles.rowTitle}>Комментарий</Text>
				<Text>{comment}</Text>
			</View>
			<View style={styles.tableRow}>
				<Text style={styles.rowTitle}>Сумма</Text>
				<Text style={styles.amount(type)}>{amount}</Text>
			</View>
			<View style={styles.tableRow}>
				<Text style={styles.rowTitle}>Баланс</Text>
				<Text>{balanceAfter}</Text>
			</View>
			<View style={styles.deleteWrap}>
				<TouchableOpacity
					id={id}
					activeOpacity={0.8}
					style={styles.deleteBtn}
					onPress={() => onRemoveTransaction(id)}
				>
					<Text style={styles.buttonLabel}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
