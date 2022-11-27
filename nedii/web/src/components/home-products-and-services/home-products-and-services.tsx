import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import GenericMiniSlider from 'src/components/generic-mini-slider';
import './home-products-and-services.scss';

const HomeProductAndServices = (): React.ReactElement => {
  const [bestSellers, setBestSellers] = useState(SystemValues.getInstance().system.homeBestSeller);
  const [deals, setDeals] = useState(SystemValues.getInstance().system.homeDeals);
  const [monthDeals, setMonthDeals] = useState(SystemValues.getInstance().system.homeMonthDeals);

  useEffect(() => {
    APISDK.getBestSellers()
      .then(() => {
        setBestSellers(SystemValues.getInstance().system.homeBestSeller);
      });
    APISDK.getDeals()
      .then(() => {
        setDeals(SystemValues.getInstance().system.homeBestSeller);
      });
    APISDK.getMonthDeals()
      .then(() => {
        setMonthDeals(SystemValues.getInstance().system.homeBestSeller);
      });
  }, [APISDK]);

  return (
    <>
    <HorizontalSpace size={SizesEnum.medium} />
    <div className='HomeProductAndServices blue-grey white-text'>
      <div className='container'>
        <div className='row'>
          <GenericMiniSlider
            title='Lo mas vendidos'
            items={bestSellers} />
          <GenericMiniSlider
            title='Articulos del mes'
            items={monthDeals} />
          <GenericMiniSlider
            title='Con descuento'
            items={deals} />
        </div>
      </div>
      <HorizontalSpace size={SizesEnum.x_small} />
    </div>
    </>
  );
};

export default HomeProductAndServices;
