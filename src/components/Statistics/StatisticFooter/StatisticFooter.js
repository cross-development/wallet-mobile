//Core
import React from 'react';
//Components
import { StyleSheet, Text, View } from 'react-native';
//Utils
import prettyNumber from '../../../utils/prettyNumber';

export default function StatisticFooter({ expenseSummary, incomeSummary }) {
	return (
		<View style={styles.summaryWrap}>
			<View style={styles.totalWrap}>
				<Text style={styles.totalTitle}>Расходы:</Text>

				<Text style={styles.totalExpense}>{prettyNumber.getPrettyNumber(expenseSummary)}</Text>
			</View>

			<View style={styles.totalWrap}>
				<Text style={styles.totalTitle}>Доходы:</Text>
				<Text style={styles.totalIncome}>{prettyNumber.getPrettyNumber(incomeSummary)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	summaryWrap: {
		marginHorizontal: 30,
		marginVertical: 10,
	},

	totalWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},

	totalTitle: {
		fontSize: 18,
		fontWeight: '700',
	},

	totalExpense: {
		fontWeight: '700',
		color: '#FF6596',
		fontSize: 18,
	},

	totalIncome: {
		fontWeight: '700',
		color: '#24CCA7',
		fontSize: 18,
	},
});
