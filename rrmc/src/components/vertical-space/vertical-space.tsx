import React from 'react';
import SizesEnum from '../_common-interfaces/sizes-enum';
import './vertical-space.scss';

interface params {
  size: SizesEnum
}

const VerticalSpace = (props: params): React.ReactElement => {
  return (
    <div
      className={`VerticalSpace VerticalSpace--${props.size}`}
    ></div>
  );
};

export default VerticalSpace;
