import React from 'react';
import TextAlignEnum from '../_common-interfaces/text-align-enum';
import './sub-title.scss';

interface TitleInterface {
  text: string;
  fullWidth?: boolean;
  link?: string;
  color?: string;
  align?: TextAlignEnum;
  shadow?: boolean;
}

const SubTitle = (props: TitleInterface): React.ReactElement => {
  return (
    <div className={`SubTitle ${ props.fullWidth ? '' : 'row'}`}>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only'></em>
      }
      <div className={`${ props.fullWidth ? '' : 'col s12 m8 l10'} SubTitle__text`}
        style={{
          color: props.color ? props.color : '#424242',
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

export default SubTitle;
