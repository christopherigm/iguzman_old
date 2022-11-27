import React from 'react';
import ParallaxHeaderImage from '../parallax-header-image/parallax-header-image';
import HorizontalSpace from '../horizontal-space/horizontal-space';
import SubTitle from '../sub-title/sub-title';

const CommonDocument = ( props: any ): React.ReactElement => {
  const text = props.text;
  const image = props.text;

  return (
    <>
      <ParallaxHeaderImage
        image={image}
        gradientOpacity='0.2'
        size='x-small'
        title={props.title} />
      <div className='container row'>
        <div className='col s1 hide-on-small-only'></div>
        <div className='col s12 m10'>
          <HorizontalSpace size='medium' />
          <SubTitle text={props.title} />
          <div dangerouslySetInnerHTML={{__html: text}}></div>
          <HorizontalSpace size='medium' />
        </div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </>
  );
};

export default CommonDocument;
