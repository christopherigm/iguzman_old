import React from 'react';
import { Link } from 'react-router-dom';
import {
  HorizontalSpace,
  StrongText,
  SubTitle,
  SizesEnum
} from 'rrmc';
import './stand-options-menu-grid.scss';
import data from './options-menu.json';

interface StandOptionMenuGridInterface {
  standSlug: string;
}

const StandOptionMenuGrid = (props: StandOptionMenuGridInterface): React.ReactElement => {
  const options = data.options;

  return (
    <div className='StandOptionMenuGrid'>
      <SubTitle text='Menú de opciones' />
      <HorizontalSpace size={SizesEnum.small} />
      <div className='row'>
        {
          options.map((i, index: number) => {
            return (
              <Link key={index}
                to={`/empresa/${props.standSlug}/${i.href}`}
                className='col s6 m4 StandOptionMenuGrid__items' >
                <i className={`material-icons z-depth-3 white-text ${i.color}`}>{i.icon}</i>
                <HorizontalSpace size={SizesEnum.xx_small} />
                <StrongText text={i.text} fullWidth={true} />
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};

export default StandOptionMenuGrid;
