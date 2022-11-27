import React, {
  useEffect,
  useState
} from 'react';
import './generic-item-detail.scss';
import { Link } from 'react-router-dom';
import {
  Title,
  HorizontalSpace,
  StrongText,
  CommonLargeText,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import GenericHeaderDetail from './generic-header-detail';
import GenericItemGallery from './generic-item-gallery';
import GenericItemPrice from './generic-item-price';
import GenericItemDetailMealsAvailability from './generic-item-meal-availability';
import GenericItemStockInfo from './generic-item-stock-info';
import GenericItemShippingInfo from './generic-item-shipping-info';
import GenericItemAddToCartButton from './generic-item-add-to-cart-button';
import GenericItemBuyNowButton from './generic-item-buy-now-button';
import GenericItemDetailFeatures from './generic-item-detail-features';
import MealAttributes from 'src/components/meal-attributes';
import VehicleAttributes from 'src/components/vehicle-attributes';
import ServicesAttributes from 'src/components/services-attributes';
import ProductAttributes from 'src/components/product-attributes';
import RealStateAttributes from 'src/components/real-estate-attributes';
import { GetBuyableItemName } from 'src/components/_adapters/buyable-item-adapter/products-services';

const GenericItemDetail = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes ) return <></>;
  const [isLoading, setIsLoading] = useState(false);
  const name = GetBuyableItemName(item);

  useEffect(() => {
    APISDK.GetNediiFavoriteItems();
    APISDK.GetNediiCartItems();
  });

  return (
    <div className='container row GenericItemDetail'>
      <div className='col s12 m8'>
        <div className='hide-on-med-and-up'>
          <HorizontalSpace size={SizesEnum.x_small} />
          <Title text={name} fullWidth={true} Link={Link} />
        </div>
        <GenericItemGallery item={item} />
        <div className='Description-movil hide-on-small-only'>
          <CommonLargeText text={item.attributes.description} Link={Link} />
        </div>
      </div>
      <div className='col s12 m4'>
        <HorizontalSpace size={SizesEnum.small} />
        <div className='GenericCard'>
          <GenericHeaderDetail
            item={item}
            isLoading={isLoading}
            setIsLoading={setIsLoading} />
          <GenericItemPrice
            discount={item.attributes.discount}
            price={item.attributes.price}
            final_price={item.attributes.final_price} />
          <GenericItemStockInfo item={item} />
          <GenericItemShippingInfo item={item} />
          { item && item.type === 'Meal' ?
            <>
              <GenericItemDetailMealsAvailability item={item} />
              <MealAttributes item={props.item} />
            </> : null }
          { item && item.type !== 'Meal' ? <StrongText text='Caracteristicas' fullWidth={true} /> : null }
          <GenericItemDetailFeatures item={props.item} />
          { props.item && props.item.type === 'Vehicle' ? <VehicleAttributes item={props.item} /> : null }
          { props.item && props.item.type === 'Service' ? <ServicesAttributes item={props.item} /> : null }
          { props.item && props.item.type === 'Product' ? <ProductAttributes item={props.item} /> : null }
          { props.item && props.item.type === 'RealEstate' ? <RealStateAttributes item={props.item} /> : null }
          <GenericItemAddToCartButton item={props.item} isLoading={isLoading} setIsLoading={setIsLoading} />
          <GenericItemBuyNowButton item={props.item} />
        </div>
      </div>
      <div className='hide-on-med-and-up col s12'>
        <HorizontalSpace size={SizesEnum.x_small} />
        <CommonLargeText text={props.item.attributes.description} Link={Link} />
        <HorizontalSpace size={SizesEnum.small} />
      </div>
    </div>
  );
};

export default GenericItemDetail;
