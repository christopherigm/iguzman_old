import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

const GetNediiCartItems = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return res(null);
    const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';
    let url = `user-cart-items/?filter[user]=${user.id}&include=`;
    url += 'product,product.stand,';
    url += 'service,service.stand,';
    url += 'meal,meal.stand,';
    url += 'meal_addons,';
    url += 'real_estate,real_estate.stand,';
    url += 'vehicle,vehicle.stand,vehicle.model,vehicle.model.make';
    url += `&fields[Product]=${commonFields}`;
    url += `&fields[Service]=${commonFields}`;
    url += `&fields[Meal]=${commonFields}`;
    url += '&fields[MealAddOn]=name,quantity,price';
    url += `&fields[RealEstate]=${commonFields}`;
    url += `&fields[Vehicle]=${commonFields},year,model&fields[VehicleModel]=name,make&fields[VehicleMake]=name`;
    url += '&fields[Stand]=name,slug';
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetSystemData({
          cart: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetNediiCartItems;
