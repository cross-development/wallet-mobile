//Core
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import FormScreen from '../nestedScreens/FormScreen';
import DefaultScreen from '../nestedScreens/DefaultScreen';

const NestedScreen = createStackNavigator();

const TransactionsScreen = () => (
	<NestedScreen.Navigator>
		<NestedScreen.Screen
			name="DefaultScreen"
			component={DefaultScreen}
			options={{ headerShown: false }}
		/>
		<NestedScreen.Screen name="FormScreen" component={FormScreen} />
	</NestedScreen.Navigator>
);

export default TransactionsScreen;
