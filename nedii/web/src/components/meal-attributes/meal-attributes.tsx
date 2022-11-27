import React from 'react';
import { StrongText } from 'rrmc';

const MealAttributes = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.relationships ||
    !item.relationships.meal_addons ||
    !item.relationships.meal_addons.data ||
    !item.relationships.meal_addons.data.length ) return <></>;
  return (
    <>
      <StrongText text='Adicionales' fullWidth={true} />
      <div className='StandMealsAddons'>
      {
        item.relationships.meal_addons.data.map((item: any, index: number) => {
          return (
            <label key={index} className='grey-text text-darken-4'>
              <input type='checkbox' />
              <span>${item.attributes.price} - {item.attributes.name}</span>
            </label>
          );
        })
      }
      </div>
    </>
  );
};

export default MealAttributes;
