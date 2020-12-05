//Core
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Components
import StatisticHeader from '../StatisticHeader';
import StatisticFooter from '../StatisticFooter';
//Redux
import { useSelector } from 'react-redux';
//Utils
import prettyNumber from '../../../utils/prettyNumber';

export default function StatisticsTable({ transactionsInfo }) {
	const { summary } = useSelector(state => state.transactions);

	const expenseSummary =
		summary?.expenseSummary === 0 ? summary.expenseSummary : summary?.expenseSummary * -1;

	return (
		<View style={styles.tableWrap}>
			<StatisticHeader />
			{transactionsInfo?.map(item => (
				<View key={item.title} style={styles.tableRow}>
					<Text style={styles.tableRowMarker(item.color)} />
					<Text style={styles.tableRowTitle}>{item.title}</Text>
					<Text style={styles.tableRowAmount}>{prettyNumber.getPrettyNumber(item.value)}</Text>
				</View>
			))}

			{summary && (
				<StatisticFooter expenseSummary={expenseSummary} incomeSummary={summary?.incomeSummary} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	tableWrap: {
		flex: 1,
		marginHorizontal: 10,
	},

	transactionContainer: {
		backgroundColor: '#4a56e2',
		marginTop: 40,
		overflow: 'hidden',
	},

	tableRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#d0d0d0',
		paddingHorizontal: 15,
	},

	tableRowMarker: typeColor => ({
		backgroundColor: `${typeColor}`,
		width: 25,
		height: 25,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		marginLeft: 10,
	}),

	tableRowTitle: {
		fontWeight: '400',
		fontSize: 16,
		color: '#000',
		flex: 1,
		textAlign: 'left',
		marginLeft: 20,
	},

	tableRowAmount: {
		fontWeight: '400',
		fontSize: 16,
		color: '#000',
		textAlign: 'right',
		marginRight: 14,
	},
});

{
	/* 
	import { FlatList } from 'react-native-gesture-handler';
	import { SafeAreaView } from 'react-native-safe-area-context';
	<SafeAreaView style={styles.tableWrap}>
				<FlatList
					data={transactionsInfo}
					ListHeaderComponent={StatisticHeader}
					renderItem={({ item }) => (
						<View style={styles.tableRow}>
							<Text style={styles.tableRowMarker(item.color)} />
							<Text style={styles.tableRowItem}>{item.title}</Text>
							<Text style={styles.tableRowItem}>{parseFloat(item.value).toFixed(2)}</Text>
						</View>
					)}
					keyExtractor={item => item.title}
				/>
			</SafeAreaView> */
}
