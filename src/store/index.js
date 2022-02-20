import { configureStore } from '@reduxjs/toolkit';
import offersSlice from './offersSlice';
import bidsSlice from './bidsSlice';

export const store = configureStore({
  reducer: {
    offers: offersSlice.reducer,
    bids: bidsSlice.reducer,
  },
});
