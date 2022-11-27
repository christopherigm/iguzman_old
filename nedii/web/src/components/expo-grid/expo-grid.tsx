import React, {
  useEffect, useState
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import './expo-grid.scss';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import ExpoItem from 'src/components/expo-grid/expo-item';
import ParallaxHeaderImage from 'src/components/parallax-header-image/parallax-header-image';

const headerPictureFile = '/assets/expos.jpg';

const ExpoGrid = (): React.ReactElement => {
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;
  const [expos, setExpos] = useState(SystemValues.getInstance().system.expos);

  useEffect(() => {
    APISDK.GetExpos()
      .then(() => {
        setExpos(SystemValues.getInstance().system.expos);
      })
      .catch((data: any) => {
        console.log(data);
      });
  }, [APISDK]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        size='small'
        title='Expos Nedii' />
      <HorizontalSpace size={SizesEnum.small} />
      <div className='container'>
        <div className='row'>
          {
            expos.map((item: any, index: number) => {
              return (
                <ExpoItem
                  key={index}
                  item={item}
                  col='col s12 m6 l4' />
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default ExpoGrid;
