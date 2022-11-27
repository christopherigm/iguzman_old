import React from 'react';
import { TextWithIcon } from 'rrmc';
import { GetBuyableItemName } from 'src/components/_adapters/buyable-item-adapter/products-services';

const GenericItemBuyNowButton = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const name = GetBuyableItemName(item);

  const buyNow = () => {
    console.log('Buy now!', name);
  };

  return (
    <>
      <div className='GenericItemDetail__buy-now' onClick={buyNow}>
        <TextWithIcon
          color_icon='cyan-text'
          icon='credit_card'
          text_color='grey-text text-darken-4'
          text='Comprar ahora'/>
      </div>
    </>
  );
};

export default GenericItemBuyNowButton;
