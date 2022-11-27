import { APIPost } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import { UserFavoriteItemsConverter } from 'src/components/_adapters/buyable-item-adapter/products-services';

export const AddNediiFavoriteItem = ( item: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return res(null);
    const data: any = {};
    const userName = `${user.attributes.first_name} ${user.attributes.last_name}`;
    data.data.type = 'UserFavoriteBuyableItems';
    data.data.relationships.user.data = null;
    data.data.relationships.product.data = null;
    data.data.relationships.meal.data = null;
    data.data.relationships.real_estate.data = null;
    data.data.relationships.service.data = null;
    data.data.relationships.vehicle.data = null;
    data.data.attributes.backup_name = item.backup_name;
    data.data.attributes.backup_user_name = userName;
    data.data.relationships.user.data = {
      type: 'User',
      id: user.id
    };
    data.data.relationships[UserFavoriteItemsConverter(item.type)].data = {
      id: item.id,
      type: item.type
    };
    APIPost('user-favorite-items/', data, true)
      .then((response: any) => {
        const itemAdded = { ...response.data };
        if ( itemAdded.attributes && itemAdded.relationships &&
          itemAdded.relationships[UserFavoriteItemsConverter(item.type)] &&
          itemAdded.relationships[UserFavoriteItemsConverter(item.type)].data ) {
          itemAdded.relationships[UserFavoriteItemsConverter(item.type)].data = { ...item };
          res(itemAdded);
        }
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddNediiFavoriteItem;
