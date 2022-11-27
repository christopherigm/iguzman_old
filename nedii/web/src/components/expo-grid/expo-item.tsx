import React from 'react';
import { Link } from 'react-router-dom';
import {
  HorizontalSpace,
  StrongText,
  SizesEnum
} from 'rrmc';

const ExpoItem = (props: any): React.ReactElement => {
  const isReal = props.item.attributes.real;
  return (
    <div className={`ExpoItem ${props.col}`}>
      <Link
        to={`/expos/${props.item.attributes.slug}`}
        className='GenericCard'>
        <div
          className='ExpoItem__img'
          style={{backgroundImage: `url(${props.item.attributes.img_picture})`}}>
        </div>
        <div className={`ExpoItem__square white-text red ${isReal ? 'hide' : ''}`}>
          Expo Virtual
          <i className='material-icons left'>laptop_windows</i>
        </div>
        <HorizontalSpace size={SizesEnum.x_small}/>
        <StrongText text={props.item.attributes.name}/>
        <div className='ExpoItem__text'>Ir a la expo</div>
      </Link>
    </div>
  );
};

export default ExpoItem;
