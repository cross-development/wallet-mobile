//Core
import React from 'react';
//Components
import { StyleSheet, Text, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { AntDesign } from '@expo/vector-icons';

export default function TransactionSwitch({ transactionType, onToggleTransactionType }) {
	const icon =
		transactionType === 'EXPENSE' ? (
			<AntDesign name="minus" size={24} color="white" />
		) : (
			<AntDesign name="plus" size={24} color="white" />
		);

	return (
		<View style={styles.container}>
			<Text style={styles.income(transactionType)}>Доход</Text>

			<View style={styles.switchWrap}>
				<ToggleSwitch
					isOn={transactionType === 'EXPENSE'}
					onColor="transparent"
					offColor="transparent"
					icon={icon}
					trackOnStyle={styles.trackOnStyle}
					trackOffStyle={styles.trackOffStyle}
					thumbOnStyle={styles.thumbOnStyle}
					thumbOffStyle={styles.thumbOffStyle}
					size="large"
					onToggle={onToggleTransactionType}
				/>
			</View>

			<Text style={styles.expense(transactionType)}>Расход</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: '2%',
	},

	switchWrap: {
		width: 120,
		alignItems: 'center',
	},

	thumbOnStyle: {
		backgroundColor: '#FF6596',
		width: 50,
		height: 50,
	},

	thumbOffStyle: {
		backgroundColor: '#24CCA7',
		width: 50,
		height: 50,
	},

	trackOnStyle: {
		borderWidth: 1,
		borderColor: '#BDBDBD',
		height: 60,
		width: 92,
	},

	trackOffStyle: {
		borderWidth: 1,
		borderColor: '#BDBDBD',
		height: 60,
		width: 92,
	},

	income: type => ({
		fontSize: 18,
		fontWeight: '700',
		color: type === 'INCOME' ? '#24CCA7' : '#BDBDBD',
	}),

	expense: type => ({
		fontSize: 18,
		fontWeight: '700',
		color: type === 'EXPENSE' ? '#FF6596' : '#BDBDBD',
	}),
});
