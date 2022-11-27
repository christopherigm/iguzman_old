import React from 'react';

const GroupDetailContent = (props: any): React.ReactElement => {
  return (
    <div className='container GroupDetailContent'>
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <div
          className='GroupDetailContent__text col s12 m10'
          dangerouslySetInnerHTML={{__html: props.description}}></div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </div>
  );
};

export default GroupDetailContent;
