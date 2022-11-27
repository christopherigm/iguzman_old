import React from 'react';
import { Link } from 'react-router-dom';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import './stand-route-nav.scss';

interface ParsedURLType {
  slug: string;
  section?: {
    label: string;
    value: string;
  };
  item?: {
    label: string;
    value: string;
  };
}

const formatString = ( str: string ): string => {
  const cleanStr = str.replaceAll('-', ' ');
  const array = cleanStr.split('');
  if ( array.length ) {
    array[0] = array[0].toUpperCase();
  }
  return array.join('');
};

const parseURL = (url: string): ParsedURLType => {
  const urlSplitted = url.split('//')[1].split('/');
  urlSplitted.shift();
  urlSplitted.shift();
  const data: ParsedURLType = {
    slug: urlSplitted[0]
  };
  switch ( urlSplitted.length ) {
    case 2:
      data.section = {
        label: formatString(urlSplitted[1]),
        value: urlSplitted[1]
      };
      break;
    case 3:
      data.section = {
        label: formatString(urlSplitted[1]),
        value: urlSplitted[1]
      };
      data.item = {
        label: formatString(urlSplitted[2]),
        value: urlSplitted[2]
      };
      break;
    default:
      break;
  }
  return data;
};

const StandRouteNav = (): React.ReactElement => {
  const url = parseURL(window.location.href);

  return (
    <div className='StandRouteNav container'>
      <HorizontalSpace size={SizesEnum.x_small} />
      <Link to={`/empresa/${url.slug}`}>Inicio</Link>
      {
        url.section ? <> &gt; <Link to={`/empresa/${url.slug}/${url.section.value}`}>{url.section.label}</Link></> : null
      }
      {
        url.item ? <> &gt; <Link to={`/empresa/${url.slug}/${url.section?.value}/${url.item.value}`}>{url.item.label}</Link></> : null
      }
    </div>
  );
};

export default StandRouteNav;
