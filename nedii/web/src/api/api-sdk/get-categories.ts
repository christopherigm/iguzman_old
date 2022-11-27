import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetCategories = ( pages?: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = pages ? `groups/?fields[Group]=name,img_picture,slug&page[size]=${pages}` :
      'groups/?fields[Group]=name,img_picture,slug&page[size]=20';
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          categories: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetCategories;
