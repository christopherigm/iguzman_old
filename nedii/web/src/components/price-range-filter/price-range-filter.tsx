import React, {
  useRef
} from 'react';
import { GetMoneyFormat } from 'rrmc';
import './price-range-filter.scss';

interface UpdateInterface {
  value: number;
  type: string;
}

const values = {
  min: 0,
  max: 0
};

const PriceRangeFilter = (props: any): React.ReactElement => {
  const minPrice: any = useRef(null);
  const maxPrice: any = useRef(null);

  const updateAddOnFilter = (update: UpdateInterface) => {
    if ( update.type === 'min' ) values.min = update.value;
    if ( update.type === 'max' ) values.max = update.value;
    let priceRangeFilter = `&filter[final_price__gte]=${values.min}`;
    if ( values.max ) {
      priceRangeFilter += `&filter[final_price__lte]=${values.max}`;
    }
    return props.updateItems({
      type: 'final_price',
      value: priceRangeFilter
    });
  };

  return (
    <div className='PriceRangeFilter'>
      <span className='StandFilters__name'>Rango de precios</span>
      <form onSubmit={PriceRangeFilter}>
        <div className='input-field'>
          <input id='minPrice' name='minPrice' type='number' className='validate'
            ref={minPrice} min='0' placeholder='Min $0.00'
            onChange={( e: any ) => updateAddOnFilter({
              value: Number(e.target.value),
              type: 'min'
            })} />
        </div>
        <div className='input-field'>
          <input id='maxPrice' name='minPrice' type='number' className='validate'
            ref={maxPrice} min='0' max={props.maxPrice}
            placeholder={`Max ${GetMoneyFormat(props.maxPrice)}`}
            onChange={( e: any ) => updateAddOnFilter({
              value: Number(e.target.value),
              type: 'max'
            })} />
        </div>
      </form>
    </div>
  );
};
export default PriceRangeFilter;
