import { APIGet } from 'src/api/communicator';
import { RebuildData } from 'rrmc';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

const GetChangeLog = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('sprints/?include=tasks,tasks.user&page[size]=100')
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          changeLog: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetChangeLog;
