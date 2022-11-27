import React from 'react';
import { Link } from 'react-router-dom';
import {
  SimpleAttribute,
  Title,
  SizesEnum
} from 'rrmc';
import { GetBuyableItemName } from 'src/components/_adapters/buyable-item-adapter/products-services';
import FavoriteButtonAdapterInterface from 'src/components/_adapters/favorite-button-adapter';

const GenericHeaderDetail = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes ) return <></>;
  const name = GetBuyableItemName(item);

  return (
    <div className='GenericItemDetail__header'>
      <FavoriteButtonAdapterInterface item={item} />
      <SimpleAttribute
        text='Ventas: '
        attribute={item.attributes.times_selled}
        size={SizesEnum.small} />
      {
        item.relationships &&
        item.relationships.classification &&
        item.relationships.classification.data &&
        item.relationships.classification.data.attributes ?
          <SimpleAttribute
            text='Categoria: '
            attribute={item.relationships.classification.data.attributes.name}
            size={SizesEnum.small}/> : null
      }
      <Title text={name} fullWidth={true} Link={Link} />
    </div>
  );
};

export default GenericHeaderDetail;
