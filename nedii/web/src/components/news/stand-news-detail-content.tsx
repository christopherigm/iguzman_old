import React from 'react';
import { Link } from 'react-router-dom';
import {
  HorizontalSpace,
  Title,
  DateParser,
  HourParser,
  SizesEnum
} from 'rrmc';
import './stand-news-detail-content.scss';

const Date = (props: any): React.ReactElement => {
  const date = DateParser(props.date);
  const time = HourParser(props.date);
  return (
    <div className='StandNewsDetailContentDate grey-text'>Fecha: {`${date} - ${time}`}</div>
  );
};

const StandNewsDetailContent = (props: any): React.ReactElement => {
  return (
    <div className='StandNewsDetailContent container row'>
      <div className='col m2 hide-on-small-only'></div>
      <div className='StandNewsDetailContent__description col s12 m8'>
        <div
          className='StandNewsDetailContent__image'
          style={{backgroundImage: `url(${props.image})`}}>
        </div>
        <HorizontalSpace size={SizesEnum.small} />
        <Title text={props.title} Link={Link} />
        <Date date={props.created}/>
        <div dangerouslySetInnerHTML={{__html: props.description}}></div>
        <HorizontalSpace size={SizesEnum.small} />
      </div>
      <div className='col m2 hide-on-small-only'></div>
    </div>
  );
};

export default StandNewsDetailContent;
