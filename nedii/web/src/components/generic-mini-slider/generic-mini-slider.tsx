import React, {
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import {
  SubTitle
} from 'rrmc';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';
import './generic-mini-slider.scss';
import SystemValues from 'src/constants/SystemValues';

const sliderNextButtonFile = '/assets/slider-button-2-next.svg';
const sliderPrevButtonFile = '/assets/slider-button-2-prev.svg';

const SlideAddons = ( props: any ): React.ReactElement => {
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const sliderNextButtonFileURL = `${prefix}${sliderNextButtonFile}`;
  const sliderPrevButtonFileURL = `${prefix}${sliderPrevButtonFile}`;
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

interface GenericMiniSliderInterface {
  items: Array<any>;
  stand?: any;
  title: string;
}

const GenericMiniSlider = (props: GenericMiniSliderInterface): React.ReactElement => {
  const [swiperReference, setSwiperReference]: any = useState(null);
  const items = props.items;

  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <>
    {
      items && items.length ?
        <div className='GenericMiniSlider col s12 m6 l4'>
          <SubTitle
            text={props.title}
            color='white'
            shadow={true} />
          <Swiper
            className='Swiper' autoplay={true} effect='coverflow'
            slidesPerView={1} spaceBetween={20}
            loop={true} onSwiper={onSwiper}
            pagination={{
              el: '.swiper-pagination', type: 'bullets', clickable: true
            }}>
            {
              items.map((item: any, index: any ) => {
                if ( !item.attributes ) return null;
                return (
                  <SwiperSlide
                    className='Swiper__slide'
                    key={index}
                    virtualIndex={index}>
                    <BuyableItemAdapter
                      key={index}
                      item={item}
                      fullWidth={true} />
                  </SwiperSlide>
                );
              })
            }
            <SlideAddons swiper={swiperReference} />
          </Swiper>
        </div> : null
    }
    </>
  );
};

export default GenericMiniSlider;
