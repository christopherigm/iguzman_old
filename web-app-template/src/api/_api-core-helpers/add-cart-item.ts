// import { APIPost } from 'src/api/communicator';
// import SystemValues from 'src/constants/SystemValues';
// import GetUserProfile from './get-cart-items';

// export const AddCartItem = ( item: any ): Promise<any> => {
//   return new Promise((res, rej) => {
//     const user = SystemValues.getInstance().system.user;
//     if ( !user.id ) return rej(new Error('No user'));
//     const data: any = {
//       data: {
//         type: 'UserCartBuyableItems',
//         attributes: {
//           quantity: 1,
//           backup_name: '',
//           backup_user_name: ''
//         },
//         relationships: {
//           user: {
//             data: null
//           },
//           product: {
//             data: null
//           },
//           meal: {
//             data: null
//           },
//           real_estate: {
//             data: null
//           },
//           service: {
//             data: null
//           },
//           vehicle: {
//             data: null
//           }
//         }
//       }
//     };
//     const userName = `${user.attributes.first_name} ${user.attributes.last_name}`;
//     data.data.type = 'UserCartBuyableItems';
//     data.data.relationships.user.data = null;
//     data.data.relationships.product.data = null;
//     data.data.relationships.meal.data = null;
//     data.data.relationships.real_estate.data = null;
//     data.data.relationships.service.data = null;
//     data.data.relationships.vehicle.data = null;
//     data.data.attributes.backup_name = item.backup_name;
//     data.data.attributes.backup_user_name = userName;
//     data.data.relationships.user.data = {
//       type: 'User',
//       id: user.id
//     };
//     data.data.relationships[UserFavoriteItemsConverter(item.type)].data = {
//       id: item.id,
//       type: item.type
//     };
//     let itemAdded: any;
//     APIPost('user-cart-items/', data)
//       .then((response: any) => {
//         itemAdded = { ...response.data };
//         if ( itemAdded.attributes && itemAdded.relationships &&
//           itemAdded.relationships[UserFavoriteItemsConverter(item.type)] &&
//           itemAdded.relationships[UserFavoriteItemsConverter(item.type)].data ) {
//           itemAdded.relationships[UserFavoriteItemsConverter(item.type)].data = { ...item };
//         }
//         return GetUserProfile();
//       })
//       .then(() => {
//         res(itemAdded);
//       })
//       .catch((error: any) => {
//         rej(error);
//       });
//   });
// };

// export default AddCartItem;

export const AddCartItem = '';
