import React, {
  useEffect,
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { Link } from 'react-router-dom';
import { PictureSlider } from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import APISDK from 'src/api/api-sdk';

const sliderNextButtonFile = '/assets/slider-button-next.svg';
const sliderPrevButtonFile = '/assets/slider-button-prev.svg';

const HomeTopSlider = (): React.ReactElement => {
  const [items, setItems] = useState(SystemValues.getInstance().system.homePictures);
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const sliderNextButtonFileURL = `${prefix}${sliderNextButtonFile}`;
  const sliderPrevButtonFileURL = `${prefix}${sliderPrevButtonFile}`;

  useEffect(() => {
    APISDK.GetHomePictures()
      .then(() => {
        setItems(SystemValues.getInstance().system.homePictures);
      });
  }, [APISDK]);

  return (
    <>
    {
      items && items.length ?
        <PictureSlider
          items={items}
          sliderNextButtonFileURL={sliderNextButtonFileURL}
          sliderPrevButtonFileURL={sliderPrevButtonFileURL}
          Swiper={Swiper}
          SwiperSlide={SwiperSlide}
          Link={Link} /> : null
    }
    </>
  );
};

export default HomeTopSlider;
