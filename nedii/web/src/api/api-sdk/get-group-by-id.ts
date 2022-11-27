import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetGroupById = (id: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`groups?filter[slug]=${id}`)
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        const data = RebuildData(response).data[0];
        const groupsById = SystemValues.getInstance().system.groupsById;
        groupsById[id] = data;
        store.dispatch(SetSystemData({
          groupsById: groupsById
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetGroupById;
