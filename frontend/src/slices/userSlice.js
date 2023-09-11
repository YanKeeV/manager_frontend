import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    certainUserInfo: localStorage.getItem('certainUserInfo')
  ? JSON.parse(localStorage.getItem('certainUserInfo'))
  : null,
}



const userSlice=createSlice({
  name:'certainUser',
  initialState,
  reducers:{
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('certainUserInfo', JSON.stringify(action.payload));
    },
    removeUser: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('certainUserInfo');
    },
  }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;