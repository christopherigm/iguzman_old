import React from 'react';
import SizesEnum from '../_common-interfaces/sizes-enum';
import './horizontal-space.scss';

interface HorizontalSpaceProps {
  size: SizesEnum
}

const HorizontalSpace = (props: HorizontalSpaceProps): React.ReactElement => {
  return (
    <div
      className={`HorizontalSpace HorizontalSpace--${props.size}`}
    ></div>
  );
};

export default HorizontalSpace;
