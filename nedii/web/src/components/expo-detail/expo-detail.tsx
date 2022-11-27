import React, {
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import {
  HorizontalSpace,
  SubTitle,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import SystemValues from 'src/constants/SystemValues';
import './expo-detail.scss';
import ExpoDetailContent from './expo-detail-content';
import ParallaxHeaderImage from 'src/components/parallax-header-image/parallax-header-image';
import GroupItem from 'src/components/group-item';

const QRodeComponent = (): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  }, [window]);

  return (
    <div className='container QRCode'>
      <SubTitle text='QR code de esta expo' />
      <QRCode
        value={canonicalURL}
        size={200}
        bgColor='#FFFFFF'
        fgColor='#000000' />
    </div>
  );
};

const ExpoDetailComponent = (): React.ReactElement => {
  const params: any = useParams();
  const [expo, setExpo]: any = useState(SystemValues.getInstance().system.exposById[params.expoId]);

  useEffect(() => {
    APISDK.GetExpoById(params.expoId)
      .then(() => {
        setExpo(SystemValues.getInstance().system.exposById[params.expoId]);
      })
      .catch((data: any) => {
        console.log(data);
      });
  }, [APISDK]);

  return (
    <>
    {
      expo && expo.id ?
        <>
        <ParallaxHeaderImage
          size='medium'
          image={expo.attributes.img_picture}
          title={expo.attributes.name}
          email={expo.attributes.email}
          real={!expo.attributes.real} />
        <HorizontalSpace size={SizesEnum.small} />
        <ExpoDetailContent description={expo.attributes.description} />
        <div className='container'>
          <div className='row'>
            {
              expo.relationships.groups.data.map((item: any, index: number) => {
                return (
                  <GroupItem
                    key={index}
                    item={item}
                    expoId={params.expoId}
                    col='col s12 m6 l4' />
                );
              })
            }
          </div>
        </div>
        <HorizontalSpace size={SizesEnum.x_small} />
        <QRodeComponent />
        <HorizontalSpace size={SizesEnum.small} />
        </> : null
    }
    </>
  );
};

export default ExpoDetailComponent;
