import React from 'react';
import { TextWithIconInfo } from 'rrmc';

const GenericItemStockInfo = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes ) return <></>;

  return (
    <>
      {
        item.attributes.unlimited_stock ?
          <TextWithIconInfo
            colorIcon='green-text'
            icon='sentiment_very_satisfied'
            text='En stock: siempre' /> :
          item.attributes.stock ?
            <TextWithIconInfo
              colorIcon='green-text'
              icon='sentiment_very_satisfied'
              text={`En stock: ${item.attributes.stock}`} /> : null
      }
    </>
  );
};

export default GenericItemStockInfo;
