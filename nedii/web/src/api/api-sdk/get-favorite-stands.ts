import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetFavoriteStands = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return res([]);
    const standFields = 'name,img_logo,img_cover,slug,highlighted_meals,restaurant,average_rating';
    const url = `user-favorite-stands/?filter[user]=${user.id}&include=stand,stand.owner&fields=[Stand]=${standFields}`;
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          favoriteStands: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetFavoriteStands;
