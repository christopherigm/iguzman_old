import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetVehiclesByStandId = (standId: number, filters?: string): Promise<any> => {
  return new Promise((res, rej) => {
    const fields = 'name,img_picture,slug,stand,price,final_price,discount,short_description,model,year&fields[Make]=name';
    const url = `vehicles/?filter[stand]=${standId}&include=classification,model,model.make,stand&fields[Stand]=name,slug&fields[Vehicle]=${fields}${filters}`;
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetVehiclesByStandId;
