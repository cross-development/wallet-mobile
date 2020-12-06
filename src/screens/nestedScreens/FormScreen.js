//Core
import React, { useState } from 'react';
//Components
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import TransactionExpInc from '../../components/Transactions/TransactionExpInc';
import TransactionSwitch from '../../components/Transactions/TransactionSwitch';
import { FontAwesome } from '@expo/vector-icons';
//Redux
import { useDispatch } from 'react-redux';
import { transactionsOperations } from '../../redux/transactions';
//Utils
import prettyDate from '../../utils/prettyDate';

const TransactionType = {
	EXPENSE: 'EXPENSE',
	INCOME: 'INCOME',
};

export default function FormScreen({ navigation }) {
	const dispatch = useDispatch();

	const [isShowKeyboard, setIsShowKeyboard] = useState(false);

	const [categoryId, setCategoryId] = useState('');
	const [comment, setComment] = useState('');
	const [amount, setAmount] = useState('');

	const [transactionDate, setTransactionDate] = useState(new Date(Date.now()));
	const [showTransactionDate, setShowTransactionDate] = useState(false);

	const prettyTransactionDate = prettyDate.formatDate(transactionDate, 'DD.MM.YYYY');

	const onChangeTransactionDate = (event, selectedDate) => {
		const currentDate = selectedDate || transactionDate;
		setShowTransactionDate(false);
		setTransactionDate(currentDate);
	};

	const [type, setType] = useState(TransactionType.INCOME);
	const handleToggleTransactionType = () =>
		setType(prevState =>
			prevState === TransactionType.INCOME ? TransactionType.EXPENSE : TransactionType.INCOME,
		);

	const handleCloseForm = () => navigation.navigate('DefaultScreen');

	const handleFormSubmit = () => {
		const transaction = {
			type,
			comment,
			categoryId,
			amount: type === TransactionType.EXPENSE ? parseFloat(-amount) : parseFloat(amount),
			transactionDate,
		};

		dispatch(transactionsOperations.addTransaction({ transaction }));
		setCategoryId('');
		setComment('');
		setAmount('');
		setType('');

		handleCloseForm();
	};

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>Добавить транзакцию</Text>
				</View>

				<View>
					<TransactionSwitch
						transactionType={type}
						onToggleTransactionType={handleToggleTransactionType}
					/>

					<View>
						<TransactionExpInc
							transactionType={type}
							categories={categoryId}
							onChangeCategory={setCategoryId}
						/>
					</View>

					<View style={styles.inputWrap}>
						<Text style={styles.inputLabel}>Сумма</Text>
						<TextInput
							style={styles.textInput}
							keyboardType="number-pad"
							placeholder="0.00"
							onFocus={() => setIsShowKeyboard(true)}
							value={amount}
							onChangeText={setAmount}
						/>
					</View>

					<View>
						<TouchableOpacity
							activeOpacity={1}
							style={styles.calendarWrap}
							onPress={() => setShowTransactionDate(true)}
						>
							<Text style={styles.calendar}>{prettyTransactionDate}</Text>
							<FontAwesome name="calendar" size={24} color="black" />
						</TouchableOpacity>

						{showTransactionDate && (
							<DateTimePicker
								testID="dateTimePicker"
								value={transactionDate}
								mode="date"
								display="calendar"
								onChange={onChangeTransactionDate}
							/>
						)}
					</View>

					<View style={styles.inputWrap}>
						<Text style={styles.inputLabel}>Комментарии</Text>
						<TextInput
							style={styles.textInput}
							onFocus={() => setIsShowKeyboard(true)}
							onChangeText={setComment}
							value={comment}
						/>
					</View>

					<View style={styles.btnWrap}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.addButton}
							onPress={handleFormSubmit}
						>
							<Text style={styles.addButtonLabel}>Добавить</Text>
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.cancelButton}
							onPress={handleCloseForm}
						>
							<Text style={styles.cancelButtonLabel}>Отмена</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E7EAF2',
	},

	title: {
		textAlign: 'center',
		fontSize: 30,
		marginBottom: 10,
		marginTop: 5,
	},

	calendarWrap: {
		marginTop: '10%',
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		borderBottomWidth: 1,
		borderBottomColor: '#BDBDBD',
	},

	calendar: {
		fontSize: 18,
		marginBottom: 6,
	},

	inputWrap: {
		marginTop: '8%',
		marginHorizontal: 20,
	},

	inputLabel: {
		textAlign: 'center',
		color: '#000',
		fontSize: 18,
		marginBottom: 6,
	},

	textInput: {
		color: '#000',
		borderBottomWidth: 1,
		borderBottomColor: '#BDBDBD',
		textAlign: 'center',
		padding: 5,
		fontSize: 18,
	},

	btnWrap: {
		alignItems: 'center',
		marginTop: '8%',
	},

	addButton: {
		width: 200,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: '#24CCA7',
		marginBottom: 10,
	},

	addButtonLabel: {
		textAlign: 'center',
		fontSize: 20,
		color: '#fff',
		paddingVertical: 5,
	},

	cancelButton: {
		width: 200,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderWidth: 1,
		borderColor: '#4A56E2',
	},

	cancelButtonLabel: {
		textAlign: 'center',
		fontSize: 20,
		color: '#4A56E2',
		paddingVertical: 5,
	},
});
