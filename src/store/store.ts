import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

//Create the store referencing the reducer from the userSlice
export const store = configureStore({
  reducer: { user: userReducer },
});

//RootState infer the type of the state returned by the getState function, which is the state structure managed by the Redux store
export type RootState = ReturnType<typeof store.getState>;
