import React from 'react';
import './multiple-style-text.scss';

const MultipleStyleText = (props: any): React.ReactElement => {
  return (
    <div className={`MultipleStyleText MultipleStyleText--${props.style}`}>{props.text}</div>
  );
};

export default MultipleStyleText;
