//Core
import React, { useState, useEffect } from 'react';
//Components
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrencyHeader from './CurrencyHeader';
//Assets
import wave from '../../../assets/images/wave.png';
//Services
import { getLatestCurrency } from '../../services/currencyAPI';

export default function CurrencyScreen() {
	const [currency, setCurrency] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getLatestCurrency().then(setCurrency).catch(setError);
	}, []);

	const newCurrency = currency.filter(({ ccy }) => ccy !== 'BTC');

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.currencyWrap}>
				<ImageBackground source={wave} style={styles.image}>
					<FlatList
						data={newCurrency}
						ListHeaderComponent={CurrencyHeader}
						renderItem={({ item }) => (
							<View style={styles.tableRow}>
								<Text style={styles.currency}>{item.ccy}</Text>
								<Text style={styles.currency}>{parseFloat(item.buy).toFixed(3)}</Text>
								<Text style={styles.currency}>{parseFloat(item.sale).toFixed(3)}</Text>
							</View>
						)}
						keyExtractor={item => item.ccy}
					/>
				</ImageBackground>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E7EAF2',
	},

	currencyWrap: {
		backgroundColor: '#4a56e2',
		marginHorizontal: 10,
		marginTop: 40,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		overflow: 'hidden',
	},

	image: {
		resizeMode: 'contain',
	},

	tableRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 30,
	},

	currency: {
		fontWeight: '400',
		fontSize: 16,
		color: '#fff',
	},
});
