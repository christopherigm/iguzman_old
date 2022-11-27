import React, {
  useState,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import { BuyableItem } from 'rrmc';
import {
  GetBuyableItemName,
  ProductTypeConverter
} from './products-services';

const BuyableItemAdapter = ( props: any ): React.ReactElement => {
  const item: any = props.item;
  const parent = item &&
    item.relationships &&
    item.relationships.stand &&
    item.relationships.stand.data &&
    item.relationships.stand.data.attributes &&
    item.relationships.stand.data.attributes.slug ?
      item.relationships.stand.data.attributes : null;
  const parentSlug: string = props.parentSlug ? props.parentSlug :
    parent ? parent.slug : null;
  const url = `/empresa/${parentSlug}/${ProductTypeConverter(item.type)}/${item.attributes.slug}`;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <>
      <BuyableItem
        Link={Link}
        fullWidth={props.fullWidth}
        mini={props.mini}
        url={url}
        backgroundImage={item.attributes.img_picture}
        name={GetBuyableItemName(item)}
        price={item.attributes.final_price}
        originalPrice={item.attributes.price}
        isLoading={isLoading}
        discount={item.attributes.discount}
        category={parent && parent.name ? parent.name : null}
        categoryLink={parent && parent.slug ? `/empresa/${parent.slug}` : ''}
        description={item.attributes.short_description}
        isFavorite={isFavorite}
        onFavoriteButtonClick={() => {
          setIsFavorite(!isFavorite);
        }} />
    </>
  );
};

export default BuyableItemAdapter;
