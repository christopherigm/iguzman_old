import React from 'react';

const MultipleStyleTextSpan = (props: any): React.ReactElement=> {
  return (
    <span className={`MultipleStyleText MultipleStyleText--${props.style}`}>{props.text}</span>
  );
};

export default MultipleStyleTextSpan;
