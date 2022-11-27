import UpdateUserProfile from './_api-core-helpers/update-user-profile';

export const UpgradeUserToSeller = (): Promise<any> => {
  return new Promise((res, rej) => {
    UpdateUserProfile({ is_seller: true })
      .then((data: any) => {
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpgradeUserToSeller;
