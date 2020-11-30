//Core
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, TextInput, View, ImageBackground, Text } from 'react-native';
import { TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
//Redux
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
//Assets
import bgImage from '../../../assets/images/bgImage.jpg';

const initialState = {
	nickname: '',
	email: '',
	password: '',
};

export default function RegisterScreen({ navigation }) {
	const [state, setState] = useState(initialState);
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);
	const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 25 * 2);

	const dispatch = useDispatch();

	useEffect(() => {
		const onChange = () => {
			const width = Dimensions.get('window').width - 25 * 2;
			setDimensions(width);
		};

		Dimensions.addEventListener('change', onChange);

		return () => {
			Dimensions.removeEventListener('change', onChange);
		};
	}, []);

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	const handleSubmit = () => {
		setState(initialState);
		dispatch(authOperations.userSignUp(state));
	};

	const changeInputEmail = value => setState(prevState => ({ ...prevState, email: value }));
	const changeInputPass = value => setState(prevState => ({ ...prevState, password: value }));
	const changeInputNickname = value => setState(prevState => ({ ...prevState, nickname: value }));

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<View style={styles.container}>
				<ImageBackground style={styles.bgImage} source={bgImage}>
					<View style={{ ...styles.form, width: dimensions }}>
						<View>
							<Text style={styles.inputLabel}>Nickname</Text>
							<TextInput
								style={styles.textInput}
								onFocus={() => setIsShowKeyboard(true)}
								value={state.nickname}
								onChangeText={changeInputNickname}
							/>
						</View>
						<View style={{ marginTop: 20 }}>
							<Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
							<TextInput
								style={styles.textInput}
								onFocus={() => setIsShowKeyboard(true)}
								value={state.email}
								onChangeText={changeInputEmail}
							/>
						</View>
						<View style={{ marginTop: 20 }}>
							<Text style={styles.inputLabel}>PASSWORD</Text>
							<TextInput
								style={styles.textInput}
								secureTextEntry={true}
								onFocus={() => setIsShowKeyboard(true)}
								value={state.password}
								onChangeText={changeInputPass}
							/>
						</View>
						<TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit}>
							<Text style={styles.buttonLabel}>SIGN UP</Text>
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
							<Text style={styles.navText}>
								Do you have account?
								<Text style={styles.navLabel}> Sign In</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	bgImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
	},

	form: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderWidth: 1,
		borderColor: '#fffaf0',
		paddingTop: 30,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 30,
	},

	inputLabel: {
		textAlign: 'center',
		color: '#fffaf0',
		fontSize: 18,
		marginBottom: 6,
		fontFamily: 'ArchitectsDaughter',
	},

	textInput: {
		color: '#fffaf0',
		borderWidth: 2,
		borderColor: '#fffaf0',
		borderRadius: 10,
		textAlign: 'center',
		padding: 5,
		fontSize: 18,
	},

	button: {
		backgroundColor: '#eb4d4b',
		height: 40,
		borderRadius: 10,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonLabel: {
		color: '#fffaf0',
		fontSize: 18,
		fontFamily: 'ArchitectsDaughter',
	},

	navText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 18,
		marginTop: 20,
		fontFamily: 'ArchitectsDaughter',
	},

	navLabel: {
		color: '#eb4d4b',
		textAlign: 'center',
		fontSize: 18,
		marginTop: 20,
		fontFamily: 'ArchitectsDaughter',
	},
});
