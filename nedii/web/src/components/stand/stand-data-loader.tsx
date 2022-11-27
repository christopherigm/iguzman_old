import React, {
  useEffect
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import StandHeader from 'src/components/stand-header';
import StandRouteNav from 'src/components/stand-route-nav';

const StandDataLoader = (props: any): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();

  const setMenu = (stand: any) => {
    const menu: any[] = [];
    menu.push({
      to: '/',
      text: 'Inicio'
    });
    menu.push({
      to: '/expos',
      text: 'Expos',
      rightLine: true
    });
    // menu.push({
    //   to: '/expos',
    //   text: 'Expos',
    //   rightLine: true
    // });
    // menu.push({
    //   to: `/empresa/${stand.attributes.slug}`,
    //   text: stand.attributes.name,
    //   rightLine: true
    // });
    if ( stand.meta.meals ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/menu`,
        text: 'Menu',
        icon: 'local_pizza'
      });
    }
    if ( stand.meta.products ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/productos`,
        text: 'Productos',
        icon: 'watch'
      });
    }
    if ( stand.meta.services ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/servicios`,
        text: 'Servicios',
        icon: 'business'
      });
    }
    if ( stand.meta.real_estate ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/inmuebles`,
        text: 'Inmuebles',
        icon: 'home'
      });
    }
    if ( stand.meta.vehicles ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/vehiculos`,
        text: 'Vehiculos',
        icon: 'directions_car'
      });
    }
    props.setSectionMenu(menu);
  };

  useEffect(() => {
    if (props.stand) {
      setMenu(props.stand);
    }
    APISDK.GetFullStandBySlug(params.standId)
      .then((response: any) => {
        setMenu(response);
        props.setStand(SystemValues.getInstance().system.standsById[params.standId]);
      })
      .catch(() => {
        return navigate('/');
      });
    APISDK.GetNediiFavoriteItems();
    APISDK.GetFavoriteStands();
  }, [APISDK]);

  return (
    <>
    {
      props.stand ?
      <>
        <StandHeader
          stand={props.stand}
          size='medium' />
        <StandRouteNav />
      </> : null
    }
    </>
  );
};

export default StandDataLoader;
