import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userName: '',
  userEmail: '',
  userProfile: '',
  authToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const userData = action.payload;
      state.userId = userData.uid;
      state.userName = userData.name;
      state.userEmail = userData.email;
      state.userProfile = userData.profileImage;
    },
    setAuthToken: (state, action) => {
      console.log(action.payload, 'action.payload');
      state.authToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserData, setAuthToken} = authSlice.actions;

export default authSlice.reducer;
