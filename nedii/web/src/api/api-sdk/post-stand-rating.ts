import { APIPost } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetFullStandById from './get-full-stand-by-id';

export const PostStandRating = (score: number, standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const ratingPayload = {
      data: {
        type: 'post-rating',
        attributes: {
            rating: score
        },
        relationships: {
          stand: {
            data: {
              id: standId
            }
          }
        }
      }
    };
    APIPost('post-rating/', ratingPayload)
      .then(() => {
        return GetFullStandById(standId);
      })
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default PostStandRating;
