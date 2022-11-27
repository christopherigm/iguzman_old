import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  SubTitle,
  SizesEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import './home-expos-grid.scss';

const HomeExpoGrid = (): React.ReactElement => {
  const [items, setItems] = useState(SystemValues.getInstance().system.homeExpos);

  useEffect(() => {
    APISDK.GetHomeExpos()
      .then(() => {
        setItems(SystemValues.getInstance().system.homeExpos);
      });
  }, [APISDK]);

  return (
    <div className='HomeExpoGrid container row'>
    <HorizontalSpace size={SizesEnum.medium} />
    <SubTitle text='Expos Nedii' />
    {
      items && items.length ?
        items.map((i: any, index: number) => {
          return (
            <Link
              to={`/expos/${i.attributes.slug}`}
              className='HomeExpoGrid__item col s6 l4' key={index}>
              <div
                className='HomeExpoGrid__image'
                style={{
                  backgroundImage: `url(${i.attributes.img_picture}`
                }}>
              </div>
              <div className='HomeExpoGrid__flex-filler'></div>
              <span className='HomeExpoGrid__name grey-text text-darken-4'>
                {i.attributes.name}
              </span>
              <div className='HomeExpoGrid__flex-filler'></div>
            </Link>
          );
        }) : null
    }
    <HorizontalSpace size={SizesEnum.medium} />
    </div>
  );
};

export default HomeExpoGrid;
