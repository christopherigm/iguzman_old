import React, {
  useEffect,
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import {
  HorizontalSpace,
  SubTitle,
  Ratings,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import APISDK from 'src/api/api-sdk';
import './home-restaurants-grid.scss';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';

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

const StandItem = (props: any): React.ReactElement => {
  const item = props.item;
  return (
    <div className='HomeRestaurantsGrid__wrapper'
      style={{
        backgroundImage: `url(${item.attributes.img_cover})`
      }}>
      <div className='HomeRestaurantsGrid__gradient'>
        <div className='container row'>
          <div className='col s12 m3'>
            <HorizontalSpace size={SizesEnum.small} />
            <Link to={`/empresa/${item.attributes.slug}`}>
              <SubTitle
                text={item.attributes.name}
                color='white'
                shadow={true} />
              <div
                className='HomeRestaurantsGrid__stand-logo z-depth-2'
                style={{
                  backgroundImage: `url(${item.attributes.img_logo})`
                }}></div>
              <HorizontalSpace size={SizesEnum.x_small} />
              <Ratings
                score={item.attributes.average_rating}
                size={SizesEnum.x_large}
                centered={true} />
            </Link>
          </div>
          <div className='col l1 hide-on-small-only'></div>
          <div className='col s12 m7'>
            <div className='hide-on-small-only'>
              <HorizontalSpace size={SizesEnum.small} />
            </div>
            <SubTitle
              text='Platillos destacados'
              color='white'
              align={TextAlignEnum.left}
              fullWidth={true}
              shadow={true} />
            <HorizontalSpace size={SizesEnum.x_small} />
            <div className='row'>
              {
                item.relationships && item.relationships.highlighted_meals && item.relationships.highlighted_meals.data ?
                item.relationships.highlighted_meals.data.map((i: any, index: number) => {
                  return (
                    <div key={index} className='col s6'>
                      <BuyableItemAdapter
                        item={i}
                        fullWidth={true}
                        parentSlug={item.attributes.slug}
                        mini={true} />
                    </div>
                  );
                }) : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeRestaurantsGrid = (): React.ReactElement => {
  const [swiperReference, setSwiperReference]: any = useState(null);
  const [items, setItems] = useState(SystemValues.getInstance().system.homeRestaurants);

  useEffect(() => {
    APISDK.GetHomeRestaurants()
      .then(() => {
        setItems(SystemValues.getInstance().system.homeRestaurants);
      });
  }, [APISDK]);

  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <>
    <HorizontalSpace size={SizesEnum.large} />
    <Swiper
      className='Swiper HomeRestaurantsGrid' autoplay={true}
      effect='fade' slidesPerView={1} spaceBetween={20}
      loop={true} onSwiper={onSwiper}
      pagination={{
        el: '.swiper-pagination', type: 'bullets', clickable: true
      }}>
      {
        items.map((item: any, index: any ) => {
          return (
            <SwiperSlide
              className='Swiper__slide'
              key={index}
              virtualIndex={index}>
              <StandItem item={item} />
            </SwiperSlide>
          );
        })
      }
      <SlideAddons swiper={swiperReference} />
    </Swiper>
    </>
  );
};

export default HomeRestaurantsGrid;
