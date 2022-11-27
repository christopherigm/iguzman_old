import React from 'react';
import './text-with-icon.scss';

const TextWithIcon = (props: any): React.ReactElement => {
  const truncate = props.truncate;
  return (
  <a className='TextWithIcon center-align'
    href={props.link} target='_blank' rel='noreferrer'>
    <i className={`material-icons ${props.color_icon}`}>{props.icon}</i>
    <span className={`grey-text text-darken-4 ${truncate ? 'truncate' : null}`}>{props.text}</span>
  </a>
  );
};

export default TextWithIcon;
