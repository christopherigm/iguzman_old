import React, { useState } from 'react';
import {
  HorizontalSpace,
  MenuChoiceMenu,
  SizesEnum
} from 'rrmc';
import ContactBusiness from './contact-business';
import {
  AboutUs,
  TheCompany,
  StarProducts
} from './sections-pages';
import './business-card.scss';

const menuItems = [
  {
    name: 'Nosotros',
    value: 'nosotros',
    icon: 'supervisor_account'
  },
  {
    name: 'La Empresa',
    value: 'empresa',
    icon: 'store'
  },
  {
    name: 'Productos estrella',
    value: 'productos',
    icon: 'star'
  }
];

export const BusinessCardMenuItem = (props: any): React.ReactElement => {
  const select = props.select;
  const option = props.option;
  return (
    <div className='BusinessCard__select_icon center-align'>
      <div className={`BusinessCard__section_icon z-depth-1 hoverable  ${select === option ? 'BusinessCard__selected' : '' }`}>
        <i className='material-icons'>{props.icon}</i>
        <div className='BusinessCard__section_icon__text'>{props.text}</div>
      </div>
    </div>
  );
};

const BusinessCard = (props: any): React.ReactElement => {
  const [select, setSelected] = useState('nosotros');
  const stand = props.stand;
  return (
    <div>
      <div className='container BusinessCard'>
        <HorizontalSpace size={SizesEnum.small} />
        <MenuChoiceMenu
          color='cyan'
          items={menuItems}
          valueReference={select}
          setValueReference={setSelected} />
        <HorizontalSpace size={SizesEnum.small} />
        <ContactBusiness stand={stand}/>
        <HorizontalSpace size={SizesEnum.small} />
      </div>
      <div className='container'>
        <div className='row'>
          {
            select === 'nosotros' ?
              <AboutUs stand={stand} /> : null
          }
          {
            select === 'empresa' ?
              <TheCompany stand={stand} /> : null
          }
          {
            select === 'productos' ?
              <StarProducts stand={stand} /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
