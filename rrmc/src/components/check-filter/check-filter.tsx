import React, {
  useState
} from 'react';
import './check-filter.scss';

interface FilterInterface {
  name?: string;
  items: Array<any>;
  filter: string;
  join?: boolean;
  updateItems: any;
}

const CheckFilter = (props: FilterInterface): React.ReactElement => {
  const [items, setItems]: Array<any> = useState([]);
  const filter: string = props.filter;
  const join: boolean = props.join ? props.join : false;

  const updateAddOnFilter = (e: any) => {
    const itemsCopy: Array<any> = [...items];
    const value = Number(e.target.value);
    const add: boolean = e.target.checked ? true : false;
    if ( add ) {
      itemsCopy.push(value);
    } else if (itemsCopy.includes(value)) {
      itemsCopy.splice(itemsCopy.indexOf(value), 1);
    }
    setItems(itemsCopy);
    let filterValues = '';
    if ( join ) {
      filterValues = itemsCopy.length ? `&filter[${filter}__in]=${itemsCopy.join(',')}` : '';
    } else {
      itemsCopy.forEach((i: number) => {
        filterValues += `&filter[${filter}]=${i}`;
      });
    }
    return props.updateItems({
      type: filter,
      value: filterValues
    });
  };

  return (
    <div className='CheckFilter'>
      <span className='CheckFilter__name'>{props.name}</span>
      <div className='row CheckFilter__wrapper'>
      {
        props.items && props.items.length ?
        props.items.map((i: any, index: number) => {
          return (
            <div key={index}>
              <label className='CheckFilter__item hide-on-med-and-down'>
                <input
                  type='checkbox'
                  value={i.id}
                  onChange={updateAddOnFilter} />
                <span className='grey-text text-darken-4'>
                  {i.attributes.name}
                </span>
              </label>
              <div className='hide-on-large-only col s4 CheckFilter__item CheckFilter__item--mini'>
                <div className='CheckFilter__item-wrapper'>
                  <div className='CheckFilter__checkbox'>
                    <label className='center'>
                      <input
                        type='checkbox'
                        value={i.id}
                        onChange={updateAddOnFilter} />
                      <span></span>
                    </label>
                  </div>
                  <div className='grey-text text-darken-4 CheckFilter__text'>
                    {i.attributes.name}
                  </div>
                </div>
              </div>
            </div>
          );
        }) : null
      }
      </div>
    </div>
  );
};
export default CheckFilter;
