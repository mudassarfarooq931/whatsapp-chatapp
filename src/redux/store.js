import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import authSlice from './slices/auth/auth-slice';
import chatSlice from './slices/chat/chat-slice';
import inboxSlice from './slices/chat/inbox-slice';

const rootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
  inbox: inboxSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['inbox', 'chat'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
const persistor = persistStore(store);
persistor.flush();

export default {store, persistor};
