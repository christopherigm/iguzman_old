import {
  APIGet,
  APIPost
} from 'src/api/communicator';

export const CreateState = (state: any): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'State',
        attributes: {
          name: state
        },
        relationships: {
          country: {
            data: {
              type: 'Country',
              id: 1
            }
          }
        }
      }
    };
    APIPost('states/', data)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const CheckState = (state: any): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`states/?filter[search]=${state}`)
      .then((response: any) => {
        const states = response.data;
        if ( !states.length ) return CreateState(state);
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

export default CheckState;
