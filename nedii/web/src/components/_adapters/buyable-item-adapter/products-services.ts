export const ProductTypeConverter = ( type: string ): string => {
  let typeParsed = '';
  switch ( type ) {
    case 'Product':
      typeParsed = 'productos';
      break;
    case 'Service':
      typeParsed = 'servicios';
      break;
    case 'Meal':
      typeParsed = 'menu';
      break;
    case 'Vehicle':
      typeParsed = 'vehiculos';
      break;
    case 'RealEstate':
      typeParsed = 'inmuebles';
      break;
    default:
      break;
  }
  return typeParsed;
};

export const UserFavoriteItemsConverter = ( type: string ): string => {
  let typeParsed = '';
  switch ( type ) {
    case 'Product':
      typeParsed = 'product';
      break;
    case 'Service':
      typeParsed = 'service';
      break;
    case 'Meal':
      typeParsed = 'meal';
      break;
    case 'Vehicle':
      typeParsed = 'vehicle';
      break;
    case 'RealEstate':
      typeParsed = 'real_estate';
      break;
    default:
      break;
  }
  return typeParsed;
};

export const GetBuyableItemName = ( item: any ): string => {
  if ( !item || !item.type || !item.attributes ) return '';
  if ( item.type !== 'Vehicle' && item.attributes.name ) {
    return item.attributes.name;
  }
  if ( item.type !== 'Vehicle' && !item.attributes.name ) return '';
  if ( item.type === 'Vehicle' && (
    !item.relationships ||
    !item.relationships.model ||
    !item.relationships.model.data ||
    !item.relationships.model.data.attributes ||
    !item.relationships.model.data.attributes.name ||
    !item.relationships.model.data.relationships ||
    !item.relationships.model.data.relationships.make ||
    !item.relationships.model.data.relationships.make.data ||
    !item.relationships.model.data.relationships.make.data.attributes ||
    !item.relationships.model.data.relationships.make.data.attributes.name
  )) return '';
  return `${item.attributes.year} ${item.relationships.model.data.relationships.make.data.attributes.name} ${item.relationships.model.data.attributes.name}`;
};

export const GetStandFromInclude = ( item: any ): any => {
  if ( !item || !item.relationships ||
    !item.relationships.stand ||
    !item.relationships.stand.data ||
    !item.relationships.stand.data.attributes ) return null;
  return item.relationships.stand.data;
};

export const ItemStateHumanReadable = ( state: string ): string => {
  switch ( state ) {
    case 'new':
      return 'Nuevo';
    case 'like-new':
      return 'Semi nuevo';
    case 'used':
      return 'Usado';
    default:
      return '';
  }
};
