import {
  SYSTEM_DATA
} from 'src/constants/SystemValues';

const SetSystemData = ( data: any ): any => {
  return {
    type: SYSTEM_DATA,
    data: data
  };
};

export default SetSystemData;
