//Core
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Components
import { Picker } from '@react-native-picker/picker';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { transactionsOperations } from '../../../redux/transactions';
//Utils
import prettyDate from '../../../utils/prettyDate';

export default function StatisticsControls() {
	const dispatch = useDispatch();
	const { items: transactions, summary } = useSelector(state => state.transactions);

	const [statMonthPeriod, setStatMonthPeriod] = useState('');
	const [statYearPeriod, setStatYearPeriod] = useState('' || summary?.year);

	const handleChangeMonthPeriod = value => setStatMonthPeriod(value);
	const handleChangeYearPeriod = value => {
		setStatYearPeriod(value);
		setStatMonthPeriod('');
	};

	const callbackTransactionsSummary = useCallback(() => {
		if (statMonthPeriod && statYearPeriod) {
			dispatch(transactionsOperations.getTransactionsSummary(statMonthPeriod, statYearPeriod));
		}
	}, [dispatch, statMonthPeriod, statYearPeriod]);

	useEffect(() => callbackTransactionsSummary(), [callbackTransactionsSummary]);

	const memoYearsOptions = useMemo(
		() =>
			prettyDate.getUniqueYearsNumber(transactions).reduce((acc, item) => {
				acc.push(<Picker.Item key={item} label={`${item}`} value={item} />);

				return acc;
			}, []),
		[transactions],
	);

	const memoMonthOptions = useMemo(() => {
		if (statYearPeriod) {
			return prettyDate.getUniqueTransactions(transactions, statYearPeriod).reduce((acc, item) => {
				const monthName = prettyDate.getMonthName(item.transactionDate);
				const monthNumber = prettyDate.getMonthNumber(item.transactionDate);

				acc.push(<Picker.Item key={item.id} label={`${monthName}`} value={monthNumber} />);

				return acc;
			}, []);
		}
	}, [statYearPeriod, transactions]);

	return (
		<View style={styles.container}>
			<View style={styles.controlsWrap}>
				<Picker
					selectedValue={statMonthPeriod || summary?.month || 'Месяц'}
					style={styles.control}
					dropdownIconColor="black"
					onValueChange={(itemValue, itemIndex) => handleChangeMonthPeriod(itemValue)}
				>
					<Picker.Item label="Месяц" />
					{statYearPeriod && memoMonthOptions}
				</Picker>
			</View>

			<View style={styles.controlsWrap}>
				<Picker
					selectedValue={statYearPeriod || 'Год'}
					style={styles.control}
					dropdownIconColor="black"
					onValueChange={(itemValue, itemIndex) => handleChangeYearPeriod(itemValue)}
				>
					<Picker.Item label="Год" />
					{memoYearsOptions}
				</Picker>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginHorizontal: 20,
		justifyContent: 'space-between',
		marginVertical: 20,
	},

	controlsWrap: {
		backgroundColor: '#fff',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 10,
	},

	control: {
		height: 50,
		width: 150,
	},
});
