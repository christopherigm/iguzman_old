import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetStandsByGroupId = (groupId: string): Promise<any> => {
  return new Promise((res, rej) => {
    const commonStandFields = '&fields[Stand]=name,slug,img_logo,img_cover,slogan,restaurant,average_rating';
    const url = `stands/?filter[group__slug]=${groupId}&include=${commonStandFields}`;
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response);
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetStandsByGroupId;
