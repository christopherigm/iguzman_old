import React, {
  useEffect,
  useState
} from 'react';
import {
  SubTitle,
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';
import SystemValues from 'src/constants/SystemValues';
import './home-meals-grid.scss';

const HomeMealsGrid = (): React.ReactElement => {
  const [selected, setSelected] = useState('is_breakfast');
  const [items, setItems]: Array<any> = useState(SystemValues.getInstance().system.homeMealsItems.breakfast);
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const backgroundIMG = `${prefix}assets/${selected}.jpg`;

  useEffect(() => {
    APISDK.GetHomeMeals()
      .then(() => {
        setItems(SystemValues.getInstance().system.homeMealsItems.breakfast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [APISDK]);

  return (
    <div className='HomeMealsGrid__wrapper' style={{backgroundImage: `url(${backgroundIMG})`}}>
      <div className='HomeMealsGrid__content container'>
        <HorizontalSpace size={SizesEnum.x_small} />
        <div className='row'>
          <div className={`col s12 m4 HomeMealsGrid__button ${selected === 'is_breakfast' ? 'HomeMealsGrid__selected' : ''}`}
            onClick={() => {
              setSelected('is_breakfast');
              setItems(SystemValues.getInstance().system.homeMealsItems.breakfast);
            }}>
            <SubTitle
              text='Vamos a desayunar'
              fullWidth={true}
              color='white'
              shadow={true} />
          </div>
          <div className={`col s12 m4 HomeMealsGrid__button ${selected === 'is_meal' ? 'HomeMealsGrid__selected' : ''}`}
            onClick={() => {
              setSelected('is_meal');
              setItems(SystemValues.getInstance().system.homeMealsItems.meal);
            }}>
            <SubTitle
              text='Vamos a comer'
              fullWidth={true}
              color='white'
              shadow={true} />
          </div>
          <div className={`col s12 m4 HomeMealsGrid__button ${selected === 'is_dinner' ? 'HomeMealsGrid__selected' : ''}`}
            onClick={() => {
              setSelected('is_dinner');
              setItems(SystemValues.getInstance().system.homeMealsItems.dinner);
            }}>
            <SubTitle
              text='Vamos a cenar'
              fullWidth={true}
              color='white'
              shadow={true} />
          </div>
        </div>
        <div className='row'>
          {
            items.map((i: any, index: number) => {
              return (
                <div key={index} className='col s6 m4 l3'>
                  <BuyableItemAdapter
                    mini={true}
                    fullWidth={true}
                    item={i} />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default HomeMealsGrid;

