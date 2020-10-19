import { configureStore } from '@reduxjs/toolkit';
import reducers           from '../store/reducers/reducers';


const store = configureStore({
  reducer: reducers
  
});


export default store;
