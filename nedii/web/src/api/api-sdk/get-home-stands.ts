import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetHomeStands = (): Promise<any> => {
  return new Promise((res, rej) => {
    const fields = 'name,slug,img_logo,restaurant,average_rating';
    const url = `stands/?page[number]=1&page[size]=6&fields[Stand]=${fields}`;
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          homeStands: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetHomeStands;
