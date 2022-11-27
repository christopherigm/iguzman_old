import { APIPatch } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetUserProfile from './get-user-profile';

interface payload {
  img_picture?: string;
  is_seller?: boolean;
  newsletter?: boolean;
  promotions?: boolean;
  biography?: string;
  owner_position?: string;
  owner_position_description?: string;
  owner_phone?: string;
  owner_office_phone?: string;
  owner_email?: string;
  owner_whatsapp?: string;
  owner_address?: string;
}

const UpdateUserProfile = ( payload: payload ): Promise<any> => {
  return new Promise((res, rej) => {
    const profile = SystemValues.getInstance().system.profile;
    if ( !profile.id ) return rej(new Error('No user'));
    const userProfileId = profile.id;
    const data = {
      data: {
        id: userProfileId,
        type: 'UserProfile',
        attributes: payload
      }
    };
    APIPatch(`user-profile/${userProfileId}/`, data)
      .then(() => {
        return GetUserProfile();
      })
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateUserProfile;
