import React from 'react';
import { TextWithIconInfo } from 'rrmc';

const GenericItemDetailFeatures = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.relationships || !item.relationships.features ||
    !item.relationships.features.data || !item.relationships.features.data.length ) {
    return <></>;
  }
  return (
    <div className='GenericItemDetailFeatures'>
    {
      item.relationships.features.data.map((item: any, index: number) => {
        return (
          <TextWithIconInfo
            key={index}
            colorIcon='cyan-text'
            icon='check'
            text={item.attributes.name} />
        );
      })
    }
    </div>
  );
};

export default GenericItemDetailFeatures;
