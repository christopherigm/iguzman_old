import SystemValues from 'src/constants/SystemValues';
import { UserFavoriteItemsConverter } from 'src/components/_adapters/buyable-item-adapter/products-services';

const IsItACartItem = ( id: number, type: string ): any => {
  let isInCart = null;
  const cart = SystemValues.getInstance().system.cart;
  cart.forEach((i: any) => {
    if ( i.relationships[UserFavoriteItemsConverter(type)] &&
      i.relationships[UserFavoriteItemsConverter(type)].data &&
      Number(i.relationships[UserFavoriteItemsConverter(type)].data.id) === id &&
      i.relationships[UserFavoriteItemsConverter(type)].data.type === type ) {
        isInCart = i;
    }
  });
  return isInCart;
};

export default IsItACartItem;
