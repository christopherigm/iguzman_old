import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import APISDK from 'src/api/api-sdk';
import StandNewsDetailContent from './stand-news-detail-content';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';

const newsData = {
  attributes: {
    created: '',
    description: '',
    img_picture: '',
    name: '',
    slug: ''
  },
  relationships: {
    stand: {
      data: {
        attributes: {
          name: '',
          img_logo: '',
          restaurant: false,
          slogan: ''
        }
      }
    }
  }
};

const StandNewDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [news, setnews]: any = useState(newsData);

  useEffect(() => {
    APISDK.GetNewsByStandId(params.standNewsId)
      .then((response: any) => {
        setnews(response);
      })
      .catch(() => {
        navigate('/');
      });
  }, [APISDK]);

  return (
    <>
      {/* <StandParallaxHeaderImage
        image={news.relationships.stand.data.attributes.img_cover}
        size='medium'
        title={news.relationships.stand.data.attributes.name}
        logo={news.relationships.stand.data.attributes.img_logo}
        restaurant={news.relationships.stand.data.attributes.restaurant}
        slogan={news.relationships.stand.data.attributes.slogan} /> */}
      <HorizontalSpace size={SizesEnum.medium} />
      <StandNewsDetailContent
        image={news.attributes.img_picture}
        name={news.attributes.name}
        created={news.attributes.created}
        description={news.attributes.description} />
    </>
  );
};

export default StandNewDetail;
