import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import UpdateStand from './update-stand';

export const DeleteStandPicture = (pictureId: number, standId: number, preExistentPictures: Array<any>): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().system.user;
    if ( !user.id ) return rej(new Error('No user'));
    APIDelete(`stand-pictures/${pictureId}/`)
      .then(() => {
        const pictureToDelete = preExistentPictures.filter((i: any) => Number(i.id) === pictureId);
        if ( pictureToDelete.length ) {
          const index = preExistentPictures.indexOf(pictureToDelete[0]);
          preExistentPictures.splice(index, 1);
        }
        return UpdateStand({
          id: standId,
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

export default DeleteStandPicture;
