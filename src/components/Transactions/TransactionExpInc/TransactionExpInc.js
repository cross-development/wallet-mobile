//Core
import React, { useMemo } from 'react';
//Components
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
//Redux
import { useSelector } from 'react-redux';

export default function TransactionExpInc({ transactionType, categories, onChangeCategory }) {
	const { categories: categoryList } = useSelector(state => state.transactions);

	const memoCategories = useMemo(
		() =>
			categoryList.reduce((acc, item) => {
				if (transactionType === item.type) {
					acc.push(<Picker.Item key={item.id} label={`${item.name}`} value={item.id} />);
				}

				return acc;
			}, []),
		[categoryList, transactionType],
	);

	return (
		<View style={styles.controlsWrap}>
			<Picker
				selectedValue={categories || 'Выберите категорию'}
				style={styles.control}
				dropdownIconColor="black"
				onValueChange={(itemValue, itemIndex) => onChangeCategory(itemValue)}
			>
				<Picker.Item label="Выберите категорию" />
				{memoCategories}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	controlsWrap: {
		marginHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#BDBDBD',
	},

	control: {
		height: 50,
		width: '100%',
	},
});
