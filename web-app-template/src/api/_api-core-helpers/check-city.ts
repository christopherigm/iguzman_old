import {
  APIGet,
  APIPost
} from 'src/api/communicator';

export const CreateCity = (city: any, stateId: number): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'City',
        attributes: {
          name: city
        },
        relationships: {
          state: {
            data: {
              type: 'State',
              id: stateId
            }
          }
        }
      }
    };
    APIPost('cities/', data)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const CheckCity = (city: any, stateId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`cities/?filter[search]=${city}`)
      .then((response: any) => {
        const cities = response.data;
        if ( !cities.length ) return CreateCity(city, stateId);
        res(response.data[0]);
      })
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default CheckCity;
