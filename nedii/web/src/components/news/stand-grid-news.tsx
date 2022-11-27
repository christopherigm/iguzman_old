import React from 'react';
import StandNewsItem from './stand-news-item';
import './stand-news-item.scss';

const StandGridNews = (props: any): React.ReactElement => {
  return (
    <div className='StandGridItems'>
      <div className='row'>
      {
        props.news.data.map((element: any, index: number) => {
          return (
            <StandNewsItem
              key={index}
              size='col s12 m4'
              colorcard='white'
              borderRadius='10px'
              image={element.attributes.img_picture}
              imageRadius='10px 10px 0 0'
              titleColor='grey-text text-darken-4'
              name={element.attributes.name}
              slug_news={element.attributes.slug}
              stand_slug={props.stand_slug}
              align='center-align'
              truncate='truncate' />
          );
        })
      }
      </div>
    </div>
  );
};

export default StandGridNews;

