import React from 'react';
import { TextWithIconInfo } from 'rrmc';

const GenericItemShippingInfo = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes ) return <></>;

  return (
    <>
      {
        item.attributes.shipping_cost && item.attributes.shipping_cost > 0 ?
          <TextWithIconInfo
            colorIcon='green-text'
            icon='local_shipping'
            text={`Costo de envío: ${item.attributes.shipping_cost}`} /> :
          item.attributes.shipping_cost === 0 ?
            <TextWithIconInfo
              colorIcon='green-text'
              icon='local_shipping'
              text='Costo de envío: Gratis' /> : null
      }
    </>
  );
};

export default GenericItemShippingInfo;
