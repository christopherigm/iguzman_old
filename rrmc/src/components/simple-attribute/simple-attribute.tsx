import React from 'react';
import SizesEnum from '../_common-interfaces/sizes-enum';
import './simple-attribute.scss';

export enum SimpleAttributeAlign {
  center_align = 'center-align'
}

export enum SimpleAttributeMargin {
  margin_top_small = 'margin-top-small',
  margin_top_medium = 'margin-top-medium',
  margin_top_large = 'margin-top-large'
}

interface SimpleAttributeInterface {
  text: string;
  attribute: string;
  size: SizesEnum;
  align?: SimpleAttributeAlign;
  margin?: SimpleAttributeMargin;
}

const SimpleAttribute = (props: SimpleAttributeInterface): React.ReactElement => {
  return (
    <div className={`SimpleAttribute SimpleAttribute--${props.size} SimpleAttribute--${props.margin} ${props.align ? props.align : SimpleAttributeAlign.center_align}`}>
      <span className='grey-text'>{props.text}</span>
      <span className='cyan-text'>{props.attribute}</span>
    </div>
  );
};

export default SimpleAttribute;
