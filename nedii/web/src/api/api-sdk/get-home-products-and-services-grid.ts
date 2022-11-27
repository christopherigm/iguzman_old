import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,created,times_selled,short_description';
const productsURL = `products/?include=stand&fields[Product]=${commonFields}`;
const servicesURL = `services/?include=stand&fields[Service]=${commonFields}`;
const vehiclesURL = `vehicles/?include=stand,model,model.make&fields[Vehicle]=${commonFields},model,year&fields[VehicleMake]=name&fields[VehicleModel]=name,make`;
const mealsURL = `meals/?include=stand&fields[Meal]=${commonFields}`;
const realEstateURL = `real-estates/?include=stand&fields[RealEstate]=${commonFields}`;

const standURL = '&fields[Stand]=name,slug&page[number]=1&page[size]=2';
const bestSeller = '&sort=-times_selled';
const newItems = '&sort=-created';
const discounts = '&sort=-discount&filter[discount__gt]=0';

const retrieveData = ( urls: Array<string> ): Promise<any> => {
  return new Promise((res, rej) => {
    const promises: Array<Promise<any>> = [];
    urls.forEach((i: string) => {
      promises.push(new Promise((res) => {
        APIGet(i)
          .then((response: any) => {
            const data = RebuildData(response).data;
            res(data);
          });
      }));
    });

    Promise.all(promises)
      .then((data: any) => {
        const results: Array<any> = [];
        data.forEach((i: any) => {
          i.forEach((j: any) => {
            results.push(j);
          });
        });
        res(results);
      })
      .catch((err: any) => {
        console.log('error:', err);
        rej(err);
      });
  });
};


export const getBestSellers = (): Promise<any> => {
  return new Promise((res, rej) => {
    const urls = [
      `${productsURL}${standURL}${bestSeller}`,
      `${servicesURL}${standURL}${bestSeller}`,
      `${vehiclesURL}${standURL}${bestSeller}`,
      `${mealsURL}${standURL}${bestSeller}`,
      `${realEstateURL}${standURL}${bestSeller}`
    ];
    retrieveData(urls)
      .then((data: any) => {
        store.dispatch(SetSystemData({
          homeBestSeller: data
        }));
        res(data);
      })
      .catch((err: any) => {
        rej(err);
      });
  });
};

export const getMonthDeals = (): Promise<any> => {
  return new Promise((res, rej) => {
    const urls = [
      `${productsURL}${standURL}${newItems}`,
      `${servicesURL}${standURL}${newItems}`,
      `${vehiclesURL}${standURL}${newItems}`,
      `${mealsURL}${standURL}${newItems}`,
      `${realEstateURL}${standURL}${newItems}`
    ];
    retrieveData(urls)
      .then((data: any) => {
        store.dispatch(SetSystemData({
          homeMonthDeals: data
        }));
        res(data);
      })
      .catch((err: any) => {
        rej(err);
      });
  });
};

export const getDeals = (): Promise<any> => {
  return new Promise((res, rej) => {
    const urls = [
      `${productsURL}${standURL}${discounts}`,
      `${servicesURL}${standURL}${discounts}`,
      `${vehiclesURL}${standURL}${discounts}`,
      `${mealsURL}${standURL}${discounts}`,
      `${realEstateURL}${standURL}${discounts}`
    ];
    retrieveData(urls)
      .then((data: any) => {
        store.dispatch(SetSystemData({
          homeDeals: data
        }));
        res(data);
      })
      .catch((err: any) => {
        rej(err);
      });
  });
};

