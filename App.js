//Core
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { loadAsync } from 'expo-font';
//Components
import Main from './src/Main';
//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const loadApplication = async () => {
	await loadAsync({
		ArchitectsDaughter: require('./assets/fonts/architects_daughter/ArchitectsDaughter-Regular.ttf'),
	});
};

export default function App() {
	const [isReady, setIsReady] = useState(false);

	if (!isReady) {
		return (
			<AppLoading
				startAsync={loadApplication}
				onFinish={() => setIsReady(true)}
				onError={console.warn}
			/>
		);
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Main />
			</PersistGate>
		</Provider>
	);
}
