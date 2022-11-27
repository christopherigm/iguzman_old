import React, {
  useEffect,
  useState
} from 'react';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import SubTitle from '../sub-title/sub-title';
import HorizontalSpace from '../horizontal-space/horizontal-space';

const QRCodeComponent = ( props: any ): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  });

  return (
    <div className='container QRCode'>
      <SubTitle text={props.title} fullWidth={true} />
      <HorizontalSpace size='small' />
      <QRCode
        value={canonicalURL}
        size={200}
        bgColor='#FFFFFF'
        fgColor={props.color} />
    </div>
  );
};

export default QRCodeComponent;
