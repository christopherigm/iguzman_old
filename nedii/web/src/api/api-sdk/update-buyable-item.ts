import { APIPatch } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const UpdateBuyableItem = (item: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data: any = {
      data: {
        id: item.id,
        type: item.itemType,
        attributes: item
      }
    };
    APIPatch(`products/${item.id}/`, data)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateBuyableItem;
