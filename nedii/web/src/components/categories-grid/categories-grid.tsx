import React, {
  useEffect, useState
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import ParallaxHeaderImage from 'src/components/parallax-header-image';
import GroupItem from 'src/components/group-item';

const CategoriesGrid = ( props: any ): React.ReactElement => {
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const [items, setItems] = useState(SystemValues.getInstance().system.categories);
  const headerPictureURL = `${prefix}/assets/digital-services.jpg`;

  useEffect(() => {
    APISDK.GetCategories()
      .then(() => {
        setItems(SystemValues.getInstance().system.categories);
      });
  }, [APISDK]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        size='x-small'
        title='Categorías' />
      <HorizontalSpace size={SizesEnum.small} />
      <div className='container'>
        <div className='row'>
          {
            items.map((item: any, index: number) => {
              return (
                <GroupItem
                  key={index}
                  item={item}
                  expoId={props.expoId}
                  col='col s12 m6 l4' />
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default CategoriesGrid;
