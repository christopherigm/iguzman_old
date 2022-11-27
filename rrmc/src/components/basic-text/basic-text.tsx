import React from 'react';
import './basic-text.scss';

const BasicText = (props: any): React.ReactElement => {
  const text = props.text;
  const style = props.style;
  return (
    <div className={`BasicText BasicText--${style}`} dangerouslySetInnerHTML={{__html: text}}></div>
  );
};

export default BasicText;
