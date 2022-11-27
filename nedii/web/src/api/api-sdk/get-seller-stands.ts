import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetSellerStands = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    let url = `stands/?filter[owner]=${user.id}&include=pictures,panorama,`;
    url += 'video_links,phones,stand_booking_questions,stand_news,promotions,';
    url += 'highlighted_products,highlighted_services,highlighted_meals,';
    url += 'highlighted_real_estates,highlighted_vehicles,';
    url += 'city,city.state';
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          sellerStands: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetSellerStands;
