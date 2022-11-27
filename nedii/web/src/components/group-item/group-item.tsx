import React from 'react';
import {
  HorizontalSpace,
  StrongText,
  SizesEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import './group-item.scss';

const GroupItem = (props: any): React.ReactElement => {
  const color = props.item.attributes.color;
  const icon = props.item.attributes.icon;
  const href = props.expoId ?
    `/expos/${props.expoId}/${props.item.attributes.slug}` :
    `/categorias/${props.item.attributes.slug}`;

  return (
    <div className={`GroupItem ${props.col}`}>
      <Link to={href} className='GenericCard'>
        <div
          className='GroupItem__img'
          style={{backgroundImage: `url(${props.item.attributes.img_picture})`}}>
          {
            icon ? <>
              <div className='GroupItem__icon center white'>
                <i className='center material-icons'
                  style={{color: `${color}`}}>{props.item.attributes.icon}</i>
              </div>
            </> : null
          }
        </div>
        {
          icon ?
            <HorizontalSpace size={SizesEnum.medium} /> :
            <HorizontalSpace size={SizesEnum.x_small} />
        }
        <StrongText text={props.item.attributes.name}/>
      </Link>
    </div>
  );
};

export default GroupItem;
