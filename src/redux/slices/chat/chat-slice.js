import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  messages: '',
};

export const chatSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessageNew: (state, action) => {
      const newArr = [action.payload, ...state.messages];
      state.messages = _.uniqBy(newArr, 'dateTime');
    },
  },
});

// Action creators are generated for each case reducer function
export const {setMessages, setMessageNew} = chatSlice.actions;

export default chatSlice.reducer;
