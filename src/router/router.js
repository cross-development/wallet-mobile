//Core
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screens
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import StatisticScreen from '../screens/mainScreens/StatisticScreen';
import TransactionsScreen from '../screens/mainScreens/TransactionsScreen';
import CurrencyScreen from '../screens/mainScreens/CurrencyScreen';
//Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
	if (!isAuth) {
		return (
			<AuthStack.Navigator>
				<AuthStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Register"
					component={RegisterScreen}
				/>
			</AuthStack.Navigator>
		);
	}

	return (
		<MainTab.Navigator tabBarOptions={{ showLabel: false }}>
			<MainTab.Screen
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<MaterialCommunityIcons name="home" size={size} color={color} />
					),
				}}
				name="Transactions"
				component={TransactionsScreen}
			/>

			<MainTab.Screen
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<MaterialCommunityIcons name="chart-bar" size={size} color={color} />
					),
				}}
				name="Statistic"
				component={StatisticScreen}
			/>

			<MainTab.Screen
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<MaterialCommunityIcons name="currency-usd" size={size} color={color} />
					),
				}}
				name="Currency"
				component={CurrencyScreen}
			/>
		</MainTab.Navigator>
	);
};
