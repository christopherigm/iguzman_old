import React, {
  useEffect,
  useState
} from 'react';
import {
  StrongText,
  TextWithIconInfo,
  GetMoneyFormat,
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import APISDK from 'src/api/api-sdk/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import { NediiPlanExposure } from './nedii-plans-exposure';
import './nedii-plans.scss';

const NediiPlanBillableItem = (props: any): React.ReactElement => {
  const item = props.item;

  return (
    <div className={`col s12 m6 xl4 NediiPlan__item ${
      props.plan && item.id !== props.plan ? 'NediiPlan__item--faded' : ''
    }`}>
      <div className='GenericCard'>
        <div className='NediiPlan__item-header-wrapper'>
          <StrongText
            color='#00acc1'
            fullWidth={true}
            text={item.attributes.name} />
          {
            item.attributes.unlimited_items ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text='Anuncios ilimitados' /> :
              item.attributes.number_of_items ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text={`${item.attributes.number_of_items} anuncios`} /> : null
          }
          {
            item.attributes.stand_enabled ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text='Micrositio' /> : null
          }
          {
            item.attributes.digital_card ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text='Tarjeta digital' /> : null
          }
          {
            item.attributes.advertising_days ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text={`${item.attributes.advertising_days} dias de publicidad`} /> : null
          }
          {
            item.attributes.exposure ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text={`Exposicion ${NediiPlanExposure(item.attributes.exposure)}`} /> : null
          }
        </div>
        <div className='NediiPlan__item-flex-filler'></div>
        <div className='NediiPlan__item-footer-wrapper'>
          <span className='NediiPlan__item-price'>
            MXN {GetMoneyFormat(item.attributes.price)} {item.attributes.billed_monthly ? 'mensuales' : 'anuales'}
          </span>
          <div className='NediiPlan__item-button'>
          {
            props.link ?
              <Link
                to={props.link}
                className='btn cyan'>
                {
                  item.id === props.plan ? 'Seleccionado' : 'Obtener'
                }
              </Link> :
              <a
                className='btn cyan'
                onClick={() => {
                  props.setValue(item.id);
                }}>
                {
                  item.id === props.plan ? 'Seleccionado' : 'Obtener'
                }
              </a>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

const NediiPlanFreeItem = (props: any): React.ReactElement => {
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const headerPictureURL = `${prefix}'/assets/circle.png'`;
  const item = props.item;

  return (
    <div className={`NediiPlan__free-item ${
      props.plan && item.id !== props.plan ? 'NediiPlan__free-item--faded' : ''
    }`}
      style={{
        backgroundImage: `url(${headerPictureURL})`
      }}>
      <span className='NediiPlan__free-item-name'>
        {item.attributes.name}
      </span>
      <span className='NediiPlan__free-item-number-of-items'>
        Publica hasta {item.attributes.number_of_items} anuncios
      </span>
      <div className='NediiPlan__free-item-button'>
      {
        props.link ?
          <Link
            to={props.link}
            className='btn cyan'>
            {
              item.id === props.plan ? 'Seleccionado' : 'Obtener'
            }
          </Link> :
          <a
            className='btn cyan'
            onClick={() => {
              props.setValue(item.id);
            }}>
            {
              item.id === props.plan ? 'Seleccionado' : 'Obtener'
            }
          </a>
      }
      </div>
    </div>
  );
};

interface NediiPlansInterface {
  setValue?: CallableFunction;
  plan?: number;
}

const NediiPlans = (props: NediiPlansInterface): React.ReactElement => {
  const [plans, setPlans] = useState(SystemValues.getInstance().system.nediiPlans);
  const user = SystemValues.getInstance().system.user;
  const link = !props.setValue ?
    user ? '/mi-cuenta/empresas' : '/create-account' :
    null;

  useEffect(() => {
    APISDK.GetNediiPlans()
      .then(() => {
        setPlans(SystemValues.getInstance().system.nediiPlans);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [APISDK]);

  return (
    <div className='NediiPlan'>
    <span className='NediiPlan__plan-types'>Planes gratis!</span>
      <HorizontalSpace size={SizesEnum.x_small} />
      <div className='NediiPlan__free-items-wrapper'>
      {
        plans.map((i: any, index: number) => {
          if ( i && i.id && i.attributes.price === '0.00' ) {
            return <NediiPlanFreeItem
                      item={i}
                      key={index}
                      setValue={props.setValue}
                      plan={props.plan}
                      link={link} />;
          }
        })
      }
      </div>
      <HorizontalSpace size={SizesEnum.small} />
      <span className='NediiPlan__plan-types'>Planes premium!</span>
      <HorizontalSpace size={SizesEnum.x_small} />
      <div className='row'>
      {
        plans.map((i: any, index: number) => {
          if ( i && i.id && i.attributes.price !== '0.00' ) {
            return (
              <NediiPlanBillableItem
                item={i}
                key={index}
                setValue={props.setValue}
                plan={props.plan}
                link={link} />
            );
          }
        })
      }
      </div>
    </div>
  );
};

export default NediiPlans;
