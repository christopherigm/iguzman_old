import React, {
  useState
} from 'react';
import {
  SubTitle,
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import NavBar from 'src/components/_core/nav-bar';
import DefaultNavButtons from 'src/components/_core/nav-bar/default-nav-buttons';
import Footer from 'src/components/_core/footer';
import HomeTopSlider from 'src/components/home-top-slider/home-top-slider';
import HomeCategorySlider from 'src/components/home-category-slider/home-category-slider';
import HomeProductAndServices from 'src/components/home-products-and-services/home-products-and-services';
import HomeExpoGrid from 'src/components/home-expos-grid/home-expos-grid';
import HomeStandsGrid from 'src/components/home-stands-grid/home-stands-grid';
import HomeRestaurantsGrid from 'src/components/home-restaurants-grid/home-restaurants-grid';
import HomeMealsGrid from 'src/components/home-meals-grid/home-meals-grid';
import NediiPlans from 'src/components/nedii-plans';

const Home = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <DefaultNavButtons
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <HomeTopSlider />
      <HomeCategorySlider />
      <HomeProductAndServices />
      <HomeExpoGrid />
      <HorizontalSpace size={SizesEnum.large} />
      <HomeMealsGrid />
      <HomeStandsGrid />
      <HomeRestaurantsGrid />
      <HorizontalSpace size={SizesEnum.large} />
      <div className='container'>
        <SubTitle text='Planes Nedii' fullWidth={true} />
        <HorizontalSpace size={SizesEnum.x_small} />
        <NediiPlans />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
