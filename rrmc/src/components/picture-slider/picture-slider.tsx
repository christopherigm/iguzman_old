import React, {
  useState
} from 'react';
import { Link } from 'react-router-dom';
import Title from '../title/title';
import './picture-slider.scss';

const SlideAddons = ( props: any ): React.ReactElement => {
  const sliderNextButtonFileURL = props.sliderNextButtonFileURL;
  const sliderPrevButtonFileURL = props.sliderPrevButtonFileURL;
  const swiper = props.swiper;

  return (
    <>
      <div
        className='Swiper__navigation-button Swiper__navigation-button--left z-depth-2'
        style={{ backgroundImage: `url(${sliderPrevButtonFileURL})` }}
        onClick={() => {
          if ( swiper ) swiper.slidePrev();
        }}></div>
      <div
        className='Swiper__navigation-button Swiper__navigation-button--right z-depth-2'
        style={{ backgroundImage: `url(${sliderNextButtonFileURL})` }}
        onClick={() => {
          if ( swiper ) swiper.slideNext();
        }}></div>
      <div className='swiper-pagination'></div>
    </>
  );
};

const SlideText = (props: any): React.ReactElement => {
  const { Link } = props;
  const align = (props.align === 'left' ||
    props.align === 'bottom_left') ? 'left' :
    (props.align === 'right' ||
    props.align === 'bottom_right') ? 'right' : 'center';
  return (
    <div className={`PictureSlider__text-wrapper PictureSlider__text-wrapper--${props.align}`}>
      <Title
        text={props.name}
        fullWidth={true}
        shadow={true}
        align={align}
        Link={Link} />
      <div
        className='PictureSlider__description'
        dangerouslySetInnerHTML={{__html: props.description || ''}}></div>
      {}
    </div>
  );
};

interface SlideTextInterface {
  Swiper: any;
  SwiperSlide: any;
  items: any;
  Link: typeof Link;
  sliderNextButtonFileURL: string;
  sliderPrevButtonFileURL: string;
}

const PictureSlider = (props: SlideTextInterface): React.ReactElement => {
  const [swiperReference, setSwiperReference] = useState('');
  const { items, Swiper, SwiperSlide, Link } = props;

  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <>
    {
      items && items.length ?
        <div className='PictureSlider z-depth-2'>
        <Swiper
          className='Swiper'
          autoplay={true}
          effect='slide'
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSwiper={onSwiper}
          pagination={{
            el: '.swiper-pagination', type: 'bullets', clickable: true
          }}
        >
          {
            items.map((item: any, index: any ) => {
              if ( !item.attributes ) return null;
              return (
                <SwiperSlide
                  className='Swiper__slide'
                  key={index}
                  virtualIndex={index}>
                  <div
                    className='Swiper__content'
                    style={{
                      backgroundImage: `url(${item.attributes.img_picture})`
                    }}>
                    {
                      item.attributes.name ||
                      item.attributes.description ?
                        <SlideText
                          name={item.attributes.name}
                          description={item.attributes.description}
                          align={item.attributes.position}
                          Link={Link} /> : null
                    }
                  </div>
                </SwiperSlide>
              );
            })
          }
          <SlideAddons
            swiper={swiperReference}
            sliderNextButtonFileURL={props.sliderNextButtonFileURL}
            sliderPrevButtonFileURL={props.sliderPrevButtonFileURL} />
        </Swiper>
      </div> : null
    }
    </>
  );
};

export default PictureSlider;
