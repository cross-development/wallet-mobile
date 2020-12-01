//Core
import React from 'react';
//Components
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderLogo from './HeaderLogo';
//Redux
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';

const AppBar = () => {
	const dispatch = useDispatch();

	const userSignOut = () => dispatch(authOperations.userSighOut());

	return (
		<View style={styles.container}>
			<HeaderLogo style={styles.logo} />
			<Text style={styles.logoText}>Wallet</Text>
			<TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={userSignOut}>
				<Text style={styles.buttonLabel}>Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#E7EAF2',
		paddingTop: 40,
		paddingBottom: 10,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	logo: {},

	logoText: {
		fontSize: 28,
		fontWeight: 'bold',
	},

	logoutBtn: {
		backgroundColor: '#507bfc',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonLabel: {
		color: '#fffaf0',
		fontSize: 16,
		flex: 1,
		textAlignVertical: 'center',
		paddingHorizontal: 10,
	},
});

export default AppBar;
