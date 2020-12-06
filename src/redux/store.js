//Core
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Redux
import { authReducers } from './auth';
import { transactionsReducers } from './transactions';

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	whitelist: ['token'],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducers),
		transactions: transactionsReducers,
	},

	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},

		immutableCheck: process.env.NODE_ENV !== 'production' && false,
	}),
});

export const persistor = persistStore(store);
