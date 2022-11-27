import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetStandsByGroupIdAndExpoId = (groupId: string, expoId: string): Promise<any> => {
  return new Promise((res, rej) => {
    const commonStandFields = '&fields[Stand]=name,slug,img_logo,img_cover,slogan,restaurant,average_rating';
    const url = `stands/?filter[expo__slug]=${expoId}&filter[group__slug]=${groupId}&include=ratings${commonStandFields}`;
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

export default GetStandsByGroupIdAndExpoId;
