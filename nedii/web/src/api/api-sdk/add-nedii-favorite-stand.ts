import { APIPost } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const AddNediiFavoriteStand = ( item: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data: any = { data: {
      type: 'UserFavoriteStands',
      relationships: {
        stand: {
          data: {
            type: 'Stand',
            id: item.id
          }
        },
        user: {
          data: {
            type: 'User',
            id: user.id
          }
        }
      }
    }};
    APIPost('user-favorite-stands/', data, true)
      .then((response: any) => {
        const itemAdded = { ...response.data };
        if ( itemAdded.attributes && itemAdded.relationships &&
          itemAdded.relationships.stand &&
          itemAdded.relationships.stand.data ) {
          itemAdded.relationships.stand.data = { ...item };
          res(itemAdded);
        }
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddNediiFavoriteStand;
