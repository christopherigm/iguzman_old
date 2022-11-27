import React from 'react';
import { Link } from 'react-router-dom';
import {
  StrongText,
  HorizontalSpace,
  Ratings,
  SizesEnum
} from 'rrmc';
import FavoriteButtonAdapterInterface from 'src/components/_adapters/favorite-button-adapter';
import './stand-grid.scss';

const StandItem = (props: any): React.ReactElement => {
  const stand: any = props.item;
  if ( !stand || !stand.id || !stand.attributes ) return <></>;
  const logo = stand.attributes.img_logo;
  const url = `/empresa/${stand.attributes.slug}`;

  return (
    <div className='col s12 m6 l4 StandItem'>
      <div className='GenericCard'>
        <Link to={url}
          className='StandItem__cover'
          style={{backgroundImage: `url(${stand.attributes.img_cover})`}}>
          <div
            className='StandItem__logo'
            style={{backgroundImage: `url(${logo})`}}></div>
        </Link>
        {
          stand.attributes.restaurant ?
            <i className='material-icons white-text red StandItem__restaurant'>restaurant</i> : null
        }
        <FavoriteButtonAdapterInterface item={stand} />
        <HorizontalSpace size={SizesEnum.medium} />
        <Ratings
          score={stand.attributes.average_rating}
          size={SizesEnum.large}
          centered={true} />
        <Link to={url}><StrongText text={stand.attributes.name}/></Link>
        {
          stand.attributes.slogan ?
            <span className='StandItem__slogan truncate grey-text text-darken-2'>
              {stand.attributes.slogan}
            </span> : null
        }
      </div>
    </div>
  );
};

export default StandItem;
