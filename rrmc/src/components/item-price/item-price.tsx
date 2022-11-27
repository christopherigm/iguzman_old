import React from 'react';
import './item-price.scss';
import GetMoneyFormat from '../utils/money-formats';

export const TextPriceLine = (props: any): React.ReactElement => {
  return (
    <span className={`TextItemPrice--${props.style}`}>
      {
        props.style === 'discount-off' ?
          `${props.text}% OFF` : GetMoneyFormat(props.text)
      }
    </span>
  );
};

export const TextPriceBlock = (props: any): React.ReactElement => {
  return (
    <div className={`TextItemPrice--${props.style}`}>
      {
        props.style === 'discount-off' ?
          `${props.text}% OFF` : GetMoneyFormat(props.text)
      }
    </div>
  );
};
