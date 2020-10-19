import { createSlice } from '@reduxjs/toolkit';


const appSlice = createSlice({
  name        : 'app',
  initialState: {
    messages: [],
    loading : false,
  },
  reducers    : {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    addMessage(state, action) {
      state.messages.push({text:action.payload.text, type: action.payload.type});
    },
    removeMessage(state) {
      state.messages.shift();
    },
  },
  
});

const {reducer, actions} = appSlice;

export const {addMessage, removeMessage, setLoadingTrue, setLoadingFalse} = actions;
export default reducer;



