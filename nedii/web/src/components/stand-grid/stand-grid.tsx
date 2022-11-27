import React from 'react';
import StandItem from './stand-item';

const StandGrid = ( props: any ): React.ReactElement => {
  return (
    <div className='container row'>
      {
        props.stands.map((i: any, index: number) => {
          return (
            <StandItem
              key={index}
              item={i} />
          );
        })
      }
    </div>
  );
};

export default StandGrid;
