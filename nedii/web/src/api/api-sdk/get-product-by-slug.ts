import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetProductBySlug = (productId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`products?filter[slug]=${productId}&include=product_pictures,stand,classification,delivery_type,features`)
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

export default GetProductBySlug;
