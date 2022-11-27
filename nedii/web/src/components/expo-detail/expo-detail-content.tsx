import React from 'react';

const ExpoDetailContent = (props: any): React.ReactElement => {
  return (
    <div className='container ExpoDetailContent'>
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <div
          className='ExpoDetailContent__text col s12 m10'
          dangerouslySetInnerHTML={{__html: props.description}}></div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </div>
  );
};

export default ExpoDetailContent;
