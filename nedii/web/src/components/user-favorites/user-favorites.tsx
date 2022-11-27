import React, {
  useEffect
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import APISDK from 'src/api/api-sdk';
import CardHolder from 'src/components/card-holder';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';

const UserFavorites = (): React.ReactElement => {
  const stands = SystemValues.getInstance().system.favoriteStands;
  const items = SystemValues.getInstance().system.favoriteItems;

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
    APISDK.GetNediiFavoriteItems();
    APISDK.GetNediiCartItems();
  }, [window]);

  return (
    <div className='col s12 m8'>
      {
        stands && stands.length ?
          <>
            <StrongText
              text='Empresas favoritas'
              fullWidth={true}
              align={TextAlignEnum.left} />
            <HorizontalSpace size={SizesEnum.x_small} />
            <div className='row'>
              {
                stands.map((i: any, index: number) => {
                  return (
                    <CardHolder
                      key={index}
                      cols='col s6 m3'
                      stand={i.relationships.stand.data} />
                  );
                })
              }
            </div>
          </> : null
      }
      <HorizontalSpace size={SizesEnum.x_small} />
      {
        items && items.length ?
          <>
            <StrongText
              text='Elementos favoritas'
              fullWidth={true}
              align={TextAlignEnum.left} />
            <HorizontalSpace size={SizesEnum.x_small} />
            <div className='row'>
              {
                items.map((i: any, index: number) => {
                  const item = i.relationships.product.data ? i.relationships.product.data :
                    i.relationships.service.data ? i.relationships.service.data :
                    i.relationships.meal.data ? i.relationships.meal.data :
                    i.relationships.real_estate.data ? i.relationships.real_estate.data :
                    i.relationships.vehicle.data ? i.relationships.vehicle.data : null;
                  return (
                    <div key={index} className='col s6 m4'>
                      <BuyableItemAdapter
                        item={item}
                        fullWidth={true}
                        mini={true} />
                    </div>
                  );
                })
              }
            </div>
          </> : null
      }
    </div>
  );
};

export default UserFavorites;
