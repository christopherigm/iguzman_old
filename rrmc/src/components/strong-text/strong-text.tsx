import React from 'react';
import TextAlignEnum from '../_common-interfaces/text-align-enum';
import './strong-text.scss';

interface StrongTextInterface {
  text: string;
  fullWidth?: boolean;
  color?: string;
  align?: TextAlignEnum;
  shadow?: boolean;
}

const StrongText = (props: StrongTextInterface): React.ReactElement => {
  return (
    <div className={`StrongText ${ props.fullWidth ? '' : 'row'}`}>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only'></em>
      }
      <div className={`${ props.fullWidth ? '' : 'col s12 m8 l10'} StrongText__text truncate`}
        style={{
          color: props.color ? props.color : '#212121',
          textAlign: props.align ? props.align : TextAlignEnum.center,
          textShadow: props.shadow ? '0px 0px 2px rgba(0, 0, 0, 0.6)' : ''
        }}>
        {props.text}
      </div>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only'></em>
      }
    </div>
  );
};

export default StrongText;
