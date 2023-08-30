import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userName: '',
  userEmail: '',
  userProfile: '',
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
  },
});

// Action creators are generated for each case reducer function
export const {setUserData} = authSlice.actions;

export default authSlice.reducer;
