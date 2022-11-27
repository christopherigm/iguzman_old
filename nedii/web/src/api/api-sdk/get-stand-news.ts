import { APIGet } from 'src/api/communicator';

export const GetNewsByStandId = (standId: string): Promise<any> => {
  const url = `stand-news?filter[slug]=${standId}&include=stand`;
  return new Promise((res, rej) => {
    APIGet(url)
      .then((response: any) => {
        if ( response.data.length === 0 ) {
          return rej('Error, noticia no existe');
        }
        const newsData = response.data[0];
        res(newsData);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetNewsByStandId;
