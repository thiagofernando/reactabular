import { combineReducers }  from 'redux';
import appReducer           from '../slices/app';

const reducers = combineReducers({
  app          : appReducer,
});

export default reducers;
