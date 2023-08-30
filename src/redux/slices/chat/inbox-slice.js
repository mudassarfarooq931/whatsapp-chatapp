import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  inboxes: [],
};

export const inboxSlice = createSlice({
  name: 'inboxSlice',
  initialState,
  reducers: {
    setInbox: (state, action) => {
      state.inboxes = action.payload;
    },
    setNewInbox: (state, action) => {
      const previusData = [...state.inboxes];
      const newInbox = action.payload;
      const getIndex = previusData?.findIndex(
        item => item.uid === newInbox.uid,
      );

      if (getIndex > -1) {
        previusData.splice(getIndex, 1);
      }
      state.inboxes = [newInbox, ...previusData];
    },
  },
});

// Action creators are generated for each case reducer function
export const {setInbox, setNewInbox} = inboxSlice.actions;

export default inboxSlice.reducer;
