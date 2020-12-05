//Core
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CurrencyHeader() {
	return (
		<View style={styles.header}>
			<Text style={styles.headerCell}>Валюта</Text>
			<Text style={styles.headerCell}>Покупка</Text>
			<Text style={styles.headerCell}>Продажа</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: '#6e78e8',
	},

	headerCell: {
		fontWeight: '700',
		color: '#fff',
		fontSize: 18,
	},
});
