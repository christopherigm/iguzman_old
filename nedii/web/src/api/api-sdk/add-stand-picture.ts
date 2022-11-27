import { APIPost } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import UpdateStand from './update-stand';

export const AddStandPicture = (picture: string, stand: number, preExistentPictures: Array<any>): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    const data: any = {
      data: {
        type: 'StandPicture',
        attributes: {
          img_picture: picture
        },
        relationships: {
          stand: {
            data: {
              type: 'Stand',
              id: stand
            }
          }
        }
      }
    };
    APIPost('stand-pictures/', data)
      .then((response: any) => {
        preExistentPictures.push(response.data);
        return UpdateStand({
          id: stand,
          pictures: preExistentPictures
        });
      })
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddStandPicture;
