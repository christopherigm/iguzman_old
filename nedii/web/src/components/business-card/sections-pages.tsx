import React from 'react';
import {
  StrongText,
  BasicText,
  SubTitle,
  HorizontalSpace,
  TextAlignEnum,
  SizesEnum
} from 'rrmc';
import StandDetailGallery from 'src/components/stand-detail-gallery';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';

export const AboutUs = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <div>
      <div className='col s12 m6'>
        {
          stand.relationships.owner ?
          <SubTitle text={`${stand.relationships.owner.data.attributes.first_name} ${stand.relationships.owner.data.attributes.last_name}`} /> : null
        }
        <StrongText text={stand.attributes.short_description} />
        <BasicText text={stand.attributes.description} />
      </div>
      <div className='col s12 m6'>
        {
          stand.relationships.owner ?
            <div
              style={{backgroundImage: `url(${stand.relationships.owner.data.attributes.profile.img_picture})`}}
              className='BusinessCard__image_profile'>
            </div> : null
        }
      </div>
    </div>
  );
};

export const TheCompany = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <div>
      <div className='col s12 m8'>
        <SubTitle
          text='Misión'
          align={TextAlignEnum.left}
          fullWidth={true} />
        <BasicText
          text={stand.attributes.mission}
          style='normal' />
        <HorizontalSpace size={SizesEnum.small} />
        <SubTitle
          text='Visión'
          align={TextAlignEnum.left}
          fullWidth={true} />
        <BasicText
          text={stand.attributes.vision}
          style='normal' />
      </div>
      <div className='col s12 m4 BusinessCard__gallery'>
        <StandDetailGallery
          images={stand.relationships.pictures.data}
          sizeGallery='small' />
      </div>
    </div>
  );
};

export const StarProductItem = (props: any): React.ReactElement => {
  const items = props.items;
  const parentSlug = props.standSlug;

  return (
    <>
      {
        items.map((i: any, index: number) => {
          return (
            <div className='col s6 m4 l3' key={index}>
              <BuyableItemAdapter
                fullWidth={true}
                mini={true}
                item={i}
                parentSlug={parentSlug} />
            </div>
          );
        })
      }
    </>
  );
};

export const StarProducts = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <div>
      <StarProductItem
        items={stand.relationships.highlighted_products.data}
        standSlug={stand.attributes.slug} />
      <StarProductItem
        items={stand.relationships.highlighted_meals.data}
        standSlug={stand.attributes.slug} />
      <StarProductItem
        items={stand.relationships.highlighted_services.data}
        standSlug={stand.attributes.slug} />
      <StarProductItem
        items={stand.relationships.highlighted_real_estates.data}
        standSlug={stand.attributes.slug} />
      <StarProductItem
        items={stand.relationships.highlighted_vehicles.data}
        standSlug={stand.attributes.slug} />
    </div>
  );
};
