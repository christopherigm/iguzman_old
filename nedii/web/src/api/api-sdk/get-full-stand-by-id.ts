import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetFullStandById = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    const commonFields = 'name,slug,price,discount,final_price,img_picture,short_description';
    let url = `stands/${standId}/?`;
    url += 'include=owner,phones,pictures,expo,group,stand_news,';
    url += 'stand_booking_questions,stand_booking_questions.options,';
    url += 'survey_questions,city,city.state,city.state.country,';
    url += 'highlighted_products,highlighted_services,highlighted_meals,';
    url += 'highlighted_real_estates,highlighted_vehicles,';
    url += 'highlighted_vehicles.model,highlighted_vehicles.model.make';
    url += `&fields[Product]=${commonFields}`;
    url += `&fields[Service]=${commonFields}`;
    url += `&fields[Meal]=${commonFields}`;
    url += `&fields[RealEstate]=${commonFields}`;
    url += `&fields[Vehicle]=${commonFields},year,model`;
    url += '&fields[VehicleModel]=name,make';
    url += '&fields[VehicleMake]=name';
    url += '&fields[City]=name,state';
    url += '&fields[State]=name,country';
    url += '&fields[Country]=name';
    APIGet(url)
      .then((response: any) => {
        if ( !response.data || !response.data.length ) {
          return rej('no data');
        }
        const data = RebuildData(response).data[0];
        const standsById = SystemValues.getInstance().system.standsById;
        standsById[standId] = data;
        store.dispatch(SetSystemData({
          standsById: standsById
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetFullStandById;
