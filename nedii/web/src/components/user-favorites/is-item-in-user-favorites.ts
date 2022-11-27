import { UserFavoriteItemsConverter } from 'src/components/_adapters/buyable-item-adapter/products-services';

export const IsItAFavoriteItem = ( id: number, type: string, items: Array<any> ): any => {
  let isFavorite = null;
  items.forEach((i: any) => {
    if ( i.relationships[UserFavoriteItemsConverter(type)] &&
      i.relationships[UserFavoriteItemsConverter(type)].data &&
      Number(i.relationships[UserFavoriteItemsConverter(type)].data.id) === id &&
      i.relationships[UserFavoriteItemsConverter(type)].data.type === type ) {
      isFavorite = i;
    }
  });
  return isFavorite;
};

export const IsItAFavoriteStand = ( id: number, type: string, items: Array<any> ): any => {
  let isFavorite = null;
  items.forEach((i: any) => {
    if ( i.relationships.stand &&
      i.relationships.stand.data &&
      Number(i.relationships.stand.data.id) === id &&
      i.relationships.stand.data.type === type ) {
      isFavorite = i;
    }
  });
  return isFavorite;
};
