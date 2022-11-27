import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  SubTitle,
  SizesEnum
} from 'rrmc';
import StandItemMini from 'src/components/stand-grid/stand-item-mini';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import './home-stands-grid.scss';

const HomeStandsGrid = (): React.ReactElement => {
  const [items, setItems] = useState(SystemValues.getInstance().system.homeStands);
  const cols = 'col s6 m3 l2';
  const title = 'Nuestros expositores';

  useEffect(() => {
    APISDK.GetHomeStands()
      .then(() => {
        setItems(SystemValues.getInstance().system.homeStands);
      });
    APISDK.GetFavoriteStands();
  }, [APISDK]);

  return (
    <div className='HomeStandsGrid container row'>
      <HorizontalSpace size={SizesEnum.medium} />
      <SubTitle text={title} />
      {
        items.map((i: any, index: number) => {
          return (
            <StandItemMini
              key={index}
              cols={cols}
              item={i} />
          );
        })
      }
      <HorizontalSpace size={SizesEnum.medium} />
    </div>
  );
};

export default HomeStandsGrid;
