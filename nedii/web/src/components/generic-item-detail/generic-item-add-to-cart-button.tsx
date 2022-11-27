import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextWithIcon } from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import APISDK from 'src/api/api-sdk';
import IsItACartItem from 'src/components/user-cart/is-item-in-user-cart';
import { GetBuyableItemName } from 'src/components/_adapters/buyable-item-adapter/products-services';
import { OpenGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';
import SetSystemData from 'src/redux/actions/_core/system';

const GenericItemAddToCartButton = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = SystemValues.getInstance().system.user;
  const isInUserCart: any = (): any => {
    return IsItACartItem(
      Number(item.id),
      item.type
    );
  };

  const addItem = () => {
    if ( !user.id ) {
      dispatch(OpenGlobalAlertDialog({
        dialog: 'missingLogin'
      }));
      return;
    }
    setIsLoading(true);
    item.backup_name = GetBuyableItemName(item);
    APISDK.AddCartItem(item)
      .then((itemAdded: any) => {
        const cart = SystemValues.getInstance().system.cart;
        cart.push(itemAdded);
        dispatch(SetSystemData(cart));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Error', err.toString());
      });
  };

  const deleteItem = (id: number) => {
    if ( !user.id ) {
      dispatch(OpenGlobalAlertDialog({
        dialog: 'missingLogin'
      }));
      return;
    }
    setIsLoading(true);
    APISDK.DeleteCartItem(id)
      .then(() => {
        const cart = SystemValues.getInstance().system.cart;
        const itemToDelete = cart.filter((i: any) => Number(i.id) === id);
        if ( itemToDelete.length ) {
          const index = cart.indexOf(itemToDelete[0]);
          cart.splice(index, 1);
        }
        dispatch(SetSystemData(cart));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Error', err);
      });
  };

  return (
    <>
    {
      isInUserCart && isInUserCart.id ?
        <div className={`GenericItemDetail__add-item-to-cart ${isLoading ? 'IsLoadingOpacity' : ''}`} onClick={() => {
          if ( isLoading ) return;
          deleteItem(Number(isInUserCart.id));
        }}>
          <TextWithIcon
            color_icon='red-text'
            icon='cancel'
            text_color='grey-text text-darken-4'
            text='Eliminar del carrito' />
        </div> :
        <div className={`GenericItemDetail__add-item-to-cart ${isLoading ? 'IsLoadingOpacity' : ''}`} onClick={() => {
          if ( isLoading ) return;
          addItem();
        }}>
          <TextWithIcon
            color_icon='cyan-text'
            icon='add_shopping_cart'
            text_color='grey-text text-darken-4'
            text='Agregar al carrito' />
        </div>
    }
    </>
  );
};

export default GenericItemAddToCartButton;
