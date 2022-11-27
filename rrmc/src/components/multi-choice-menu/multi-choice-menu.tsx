import React from 'react';
import './multi-choice-menu.scss';
import HorizontalSpace from '../horizontal-space/horizontal-space';

interface MenuChoiceMenuItemInterface {
  value: any;
  icon: string;
  name: string;
}
interface MenuChoiceMenuInterface {
  title?: string;
  color: string;
  valueReference: any;
  setValueReference: CallableFunction;
  items: Array<MenuChoiceMenuItemInterface>;
}

const MenuChoiceMenu = (props: MenuChoiceMenuInterface): React.ReactElement => {
  return (
    <div className='MenuChoiceMenu'>
      {
        props.title ? <p>{props.title}</p> : null
      }
      <HorizontalSpace size='xxx-small' />
      <div className='MenuChoiceMenu__wrapper'>
      {
        props.items.map((i: MenuChoiceMenuItemInterface, index: number) => {
          return (
            <div className='MenuChoiceMenu__item' key={index} onClick={() => {
              props.setValueReference(i.value);
            }}>
              <i className={`material-icons hoverable white-text ${
                props.valueReference === i.value ? props.color : 'grey lighten-1'
              }`}>
                {i.icon}
              </i>
              <span className={props.valueReference === i.value ? `${props.color}-text` : ''}>
                {i.name}
              </span>
            </div>
          );
        })
      }
      </div>
    </div>
  );
};

export default MenuChoiceMenu;
