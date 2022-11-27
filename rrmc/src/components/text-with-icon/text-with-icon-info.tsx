import React from 'react';
import './text-with-icon.scss';

const TextWithIconInfo = (props: any): React.ReactElement => {
  return (
  <div className={`TextWithIconinfo  ${props.className}`}>
    <i className={`material-icons left ${props.colorIcon}`}>{props.icon}</i>{props.text}
    <span className='grey-text text-darken-4 truncate'></span>
  </div>
  );
};

export default TextWithIconInfo;
