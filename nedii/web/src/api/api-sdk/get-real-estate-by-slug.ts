import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetRealEstateBySlug = (realEstateId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`real-estates?filter[slug]=${realEstateId}&include=classification,real_estate_pictures,features`)
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        const data = RebuildData(response).data[0];
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetRealEstateBySlug;
