import React, {
  useState,
  useEffect
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import UserCartItem from './user-cart-item';

const UserCart = (): React.ReactElement => {
  const items = SystemValues.getInstance().system.cart;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
    APISDK.GetNediiCartItems();
  }, [window]);

  return (
    <div className='col s12 m8'>
      {
        items && items.length ?
          <>
            <StrongText
              text='Carrito de compras'
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
                  if ( !item || !item.relationships || !item.attributes ) return <></>;
                  return (
                    <div key={index} className='col s12'>
                      <UserCartItem
                        item={item}
                        cartItem={i}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
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

export default UserCart;
