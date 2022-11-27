import React from 'react';
import Title from '../title/title';

const CommonLargeText = (props: any): React.ReactElement => {
  const { Link } = props;
  return (
    <>
      {
        props.title ? <Title text={props.title} Link={Link} /> : null
      }
      <div
        className='Stand__common-large-text'
        dangerouslySetInnerHTML={{__html: props.text}}>
      </div>
    </>
  );
};

export default CommonLargeText;
