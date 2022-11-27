import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

const GetSystemConfigurations = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('system/?fields[System]=site_name,img_logo')
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        store.dispatch(SetSystemData({
          configurations: response.data[0].attributes
        }));
        res(response.data[0]);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetSystemConfigurations;
