import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetHomePictures = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('system/?include=home_pictures')
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        const data = RebuildData(response).data[0];
        if ( data && data.relationships &&
            data.relationships.home_pictures &&
            data.relationships.home_pictures.data &&
            data.relationships.home_pictures.data.length ) {
          const homePictures = data.relationships.home_pictures.data;
          store.dispatch(SetSystemData({
            homePictures: homePictures
          }));
          res(homePictures);
        } else {
          res([]);
        }
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetHomePictures;
