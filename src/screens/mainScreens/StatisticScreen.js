//Core
import React from 'react';
//Components
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Statistics from '../../components/Statistics';
//Redux
import { useSelector } from 'react-redux';

export default function StatisticScreen() {
	const { loading } = useSelector(state => state.transactions);

	return (
		<View style={styles.container}>
			{loading ? <ActivityIndicator size={100} color="#0000ff" /> : <Statistics />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});
