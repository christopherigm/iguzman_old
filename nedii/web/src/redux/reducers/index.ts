import { combineReducers } from 'redux';
import SystemValues from 'src/constants/SystemValues';

const reducers = {
  system: SystemValues.getInstance().SystemReducer
};

export default combineReducers(reducers);
