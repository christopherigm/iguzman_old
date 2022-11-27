import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetSellerProducts = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    let url = `products/?filter[stand.owner]=${user.id}`;
    url += '&include=stand&fields[Stand]=slug,name';
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          sellerProducts: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetSellerProducts;
