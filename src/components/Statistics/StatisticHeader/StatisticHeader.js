//Core
import React from 'react';
//Components
import { StyleSheet, Text, View } from 'react-native';

export default function StatisticHeader() {
	return (
		<View style={styles.header}>
			<Text style={styles.headerCell}>Категория</Text>
			<Text style={styles.headerCell}>Сумма</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 30,
		backgroundColor: '#fff',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},

	headerCell: {
		fontWeight: '700',
		color: '#000',
		fontSize: 18,
	},
});
