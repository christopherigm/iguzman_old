import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  CheckFilter,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';
import PriceRangeFilter from 'src/components/price-range-filter';

const urlValues: any = {};

const StandVehiclesGrid = (props: any): React.ReactElement => {
  const stand = props.stand;
  const standId = Number(stand.id);
  const [items, setItems] = useState([]);
  const [classifications, setClassifications] = useState(SystemValues.getInstance().system.vehicleClassifications);
  const [addOns, setAddOns] = useState([]);

  const updateItems = ( updates: any ) => {
    let filters = '';
    urlValues[updates.type] = updates.value;
    for (const i in urlValues) {
      if (Object.prototype.hasOwnProperty.call(urlValues, i)) {
        const value = urlValues[i];
        if ( value ) filters += value;
      }
    }
    APISDK.GetMealsByStandId(standId, filters)
      .then((response: any) => {
        setItems(response);
      })
      .catch((error: any) => {
        console.log('Hubo un error', error);
      });
  };

  useEffect(() => {
    APISDK.GetMealsByStandId(standId)
      .then((response: any) => {
        setItems(response);
      })
      .catch((error: any) => {
        console.log('Hubo un error', error);
      });
    APISDK.GetMealsClassificationsByStand(standId)
      .then(() => {
        setClassifications(SystemValues.getInstance().system.vehicleClassifications);
      })
      .catch((error: any) => console.log('Hubo un error', error));
    APISDK.GetVehicleFeatures()
      .then((response: any) => setAddOns(response))
      .catch((error: any) => console.log('Hubo un error', error));
  }, [APISDK]);

  return (
    <div className='container row'>
      <HorizontalSpace size={SizesEnum.small} />
      <div className='col s12 m4'>
        <div className='GenericCard'>
          <CheckFilter
            name='Clasificaciones'
            items={[...classifications]}
            filter='classification'
            join={true}
            updateItems={updateItems} />
          <HorizontalSpace size={SizesEnum.small} />
          <PriceRangeFilter
            maxPrice={props.stand.attributes.vehicles_max_price + 100}
            updateItems={updateItems} />
          <HorizontalSpace size={SizesEnum.small} />
          <CheckFilter
            name='Caracteristicas adicionales'
            items={[...addOns]}
            filter='features'
            updateItems={updateItems} />
        </div>
      </div>
      {
        items.map((i: any, index: number) => {
          return (
            <BuyableItemAdapter
              key={index}
              item={i} />
          );
        })
      }
    </div>
  );
};

export default StandVehiclesGrid;
