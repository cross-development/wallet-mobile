//Core
import React from 'react';
//Components
import { Image, StyleSheet } from 'react-native';
//Assets
import logo from '../../../assets/images/logo.png';

const HeaderLogo = () => <Image style={styles.logoImg} source={logo} />;

const styles = StyleSheet.create({
	logoImg: {
		width: 40,
		height: 40,
	},
});

export default HeaderLogo;
