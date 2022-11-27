import React from 'react';
import './indicator.scss';

const Indicator = (): React.ReactElement => {
  return (
    <div className='Indicator'>
      <span className='red'>
        <i className='material-icons white-text'>laptop_windows</i>Expo Virtual
      </span>
    </div>
  );
};

export default Indicator;
