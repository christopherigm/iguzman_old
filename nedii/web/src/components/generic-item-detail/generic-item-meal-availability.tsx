import React from 'react';
import {
  TextWithIconInfo,
  StrongText
} from 'rrmc';

const GenericItemDetailMealsAvailability = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || item.type !== 'Meal' ) return <></>;
  if ( !item.attributes.is_breakfast &&
    !item.attributes.is_meal &&
    !item.attributes.is_dinner ) return <></>;
  return (
    <>
      <StrongText text='Disponibilidad' fullWidth={true} />
      {
        item.attributes.is_breakfast ?
          <TextWithIconInfo
            text='Desayuno'
            colorIcon='orange-text'
            icon='brightness_7' /> : null
      }
      {
        item.attributes.is_meal ?
          <TextWithIconInfo
            text='Comida'
            colorIcon='cyan-text'
            icon='brightness_6' /> : null
      }
      {
        item.attributes.is_dinner ?
          <TextWithIconInfo
            text='Cena'
            colorIcon='indigo-text'
            icon='brightness_2' /> : null
      }
    </>
  );
};

export default GenericItemDetailMealsAvailability;
