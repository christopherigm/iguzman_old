import { APIPost } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const AddBuyableItem = (item: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data: any = {
      data: {
        type: item.itemType,
        attributes: item,
        relationships: {
          stand: {
            data: {
              type: 'Stand',
              id: item.stand
            }
          },
          classification: {
            data: {
              type: item.itemClassificacionType,
              id: item.classification
            }
          },
          delivery_type: {
              data: []
          },
          features: {
              data: []
          },
          product_pictures: {
              data: []
          },
          service_pictures: {
              data: []
          },
          meal_addons: {
            data: []
          },
          meal_pictures: {
            data: []
          },
          vehicle_pictures: {
            data: []
          },
          related: {
              data: []
          }
        }
      }
    };
    const dataToSend = {...data};
    delete dataToSend.stand;
    delete dataToSend.itemClassificacionType;
    delete dataToSend.classification;
    delete dataToSend.itemType;
    let url = 'products/';
    if ( item.itemType === 'Service' ) {
      url = 'services/';
    }
    if ( item.itemType === 'Meal' ) {
      url = 'meals/';
    }
    if ( item.itemType === 'Vehicle' ) {
      url = 'vehicles/';
      data.data.relationships.model = {
        data: {
          type: 'VehicleModel',
          id: 1
        }
      };
    }
    if ( item.itemType === 'RealEstate' ) {
      url = 'real-estates/';
    }
    APIPost(url, dataToSend)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddBuyableItem;
