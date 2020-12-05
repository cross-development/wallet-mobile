//Core
import React, { useMemo } from 'react';
import randomColor from 'randomcolor';
//Components
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { VictoryPie } from 'victory-native';
import StatisticsTable from './StatisticsTable';
import StatisticsControls from './StatisticsControls';
//Redux
import { useSelector } from 'react-redux';
//Utils
import prettyNumber from '../../utils/prettyNumber';

export default function StatisticScreen() {
	const { summary } = useSelector(state => state.transactions);
	const { user } = useSelector(state => state.auth);

	const balance = user.balance.toLocaleString('ua-UA', { minimumFractionDigits: 2 });

	const summaryName = summary?.categoriesSummary?.reduce((acc, { name, type }) => {
		if (type === 'EXPENSE') acc.push(name);

		return acc;
	}, []);

	const summaryValue = summary?.categoriesSummary?.reduce((acc, { type, total }) => {
		if (type === 'EXPENSE') acc.push(-1 * total);

		return acc;
	}, []);

	const chartColorsNew = randomColor({
		count: summaryValue?.length,
		luminosity: 'dark',
		format: 'hex',
	});

	const transactionsInfo = summaryValue?.map((_, idx) => ({
		title: summaryName[idx],
		value: summaryValue[idx],
		color: chartColorsNew[idx],
	}));

	const memoChartComponent = useMemo(
		() =>
			summaryValue?.length > 0 && (
				<View style={styles.chartWrap}>
					<VictoryPie
						data={summaryValue}
						width={250}
						height={250}
						colorScale={[...chartColorsNew]}
						innerRadius={85}
						style={{ labels: { fontSize: 0 } }}
						padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
					/>
					<Text style={styles.currentBalance}>₴ {prettyNumber.getPrettyNumber(balance)}</Text>
				</View>
			),
		[balance, chartColorsNew, summaryValue],
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.container}>
					<View>
						<Text style={styles.title}>Статистика</Text>
					</View>

					{memoChartComponent}

					<StatisticsControls />

					<StatisticsTable transactionsInfo={transactionsInfo} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#E7EAF2',
	},

	chartWrap: {
		position: 'relative',
		alignItems: 'center',
	},

	title: {
		fontSize: 30,
		marginBottom: 10,
		marginLeft: 20,
		marginTop: 5,
	},

	currentBalance: {
		position: 'absolute',
		top: '42%',
		left: '35%',
		color: '#000',
		fontSize: 22,
		fontWeight: '700',
	},
});
