import React, {
  useRef,
  useState
} from 'react';
import {
  GenericTextInput,
  HorizontalSpace,
  StrongText,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';

const AddSocialMedia = ( props: any ): React.ReactElement => {
  const stand: any = props.stand;
  const formRef: any = useRef(null);
  const [webLinkURL, setWebLinkURL] = useState('');
  const [facebookLinkURL, setFacebookLinkURL] = useState('');
  const [twitterLinkURL, setTwitterLinkURL] = useState('');
  const [instagramLinkURL, setInstagramLinkURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [googleLinkURL, setGoogleLinkURL] = useState('');
  const [youtubeLinkURL, setYoutubeLinkURL] = useState('');
  let cLinkedinURL = '';
  let cWebLinkURL = '';
  let cFacebookLinkURL = '';
  let cTwitterLinkURL = '';
  let cInstagramLinkURL = '';
  let cGoogleLinkURL = '';
  let cYoutubeLinkURL = '';
  if ( stand && stand.attributes ) {
    if ( stand.attributes.web_link ) {
      cWebLinkURL = stand.attributes.web_link;
    }
    if ( stand.attributes.facebook_link ) {
      cFacebookLinkURL = stand.attributes.facebook_link;
    }
    if ( stand.attributes.twitter_link ) {
      cTwitterLinkURL = stand.attributes.twitter_link;
    }
    if ( stand.attributes.instagram_link ) {
      cInstagramLinkURL = stand.attributes.instagram_link;
    }
    if ( stand.attributes.google_link ) {
      cGoogleLinkURL = stand.attributes.google_link;
    }
    if ( stand.attributes.youtube_link ) {
      cYoutubeLinkURL = stand.attributes.youtube_link;
    }
    if ( stand.attributes.linkedin_link ) {
      cLinkedinURL = stand.attributes.linkedin_link;
    }
  }

  const addSocialMediaInfo = (e: any) => {
    e.preventDefault();
    if ( props.isLoading ) return null;
    props.setIsLoading(true);
    const data: any = {
      id: stand.id
    };
    if ( webLinkURL ) data.web_link = webLinkURL;
    if ( facebookLinkURL ) data.facebook_link = facebookLinkURL;
    if ( twitterLinkURL ) data.twitter_link = twitterLinkURL;
    if ( instagramLinkURL ) data.instagram_link = instagramLinkURL;
    if ( linkedinURL ) data.linkedin_link = linkedinURL;
    if ( googleLinkURL ) data.google_link = googleLinkURL;
    if ( youtubeLinkURL ) data.youtube_link = youtubeLinkURL;
    APISDK.UpdateStand(data)
      .then(() => {
        return APISDK.GetSellerStands();
      })
      .then(() => {
        props.setIsLoading(false);
      })
      .catch((error: any) => {
        console.log('error', error);
        props.setIsLoading(false);
      });
  };

  return (
    <>
    {
      stand ?
        <>
        <HorizontalSpace size={SizesEnum.small} />
        <StrongText
          fullWidth={true}
          align={TextAlignEnum.left}
          text={`Editando redes sociales de ${stand.attributes.name}`} />
        </> : null
    }
    <HorizontalSpace size={SizesEnum.xx_small} />
    <form onSubmit={addSocialMediaInfo} ref={formRef}>
      <GenericTextInput id='webLinkURL' type='text' placeholder='Pagina web URL'
        disabled={props.isLoading} value={cWebLinkURL} setValue={setWebLinkURL} />
      <GenericTextInput id='facebookLinkURL' type='text' placeholder='Facebook URL'
        disabled={props.isLoading} value={cFacebookLinkURL} setValue={setFacebookLinkURL} />
      <GenericTextInput id='twitterLinkURL' type='text' placeholder='Twitter URL'
        disabled={props.isLoading} value={cTwitterLinkURL} setValue={setTwitterLinkURL} />
      <GenericTextInput id='instagramLinkURL' type='text' placeholder='Instagram URL'
        disabled={props.isLoading} value={cInstagramLinkURL} setValue={setInstagramLinkURL} />
      <GenericTextInput id='linkedinURL' type='text' placeholder='LinkedIn URL'
        disabled={props.isLoading} value={cLinkedinURL} setValue={setLinkedinURL} />
      <GenericTextInput id='googleLinkURL' type='text' placeholder='Google+ URL'
        disabled={props.isLoading} value={cGoogleLinkURL} setValue={setGoogleLinkURL} />
      <GenericTextInput id='youtubeLinkURL' type='text' placeholder='Youtube URL'
        disabled={props.isLoading} value={cYoutubeLinkURL} setValue={setYoutubeLinkURL} />
      <div className='input-field col s12'>
        <input id='submit' type='submit'
          value='Guardar'
          className={`waves-effect waves-light btn right cyan ${ props.isLoading ? 'disabled' : ''}`}
          disabled={props.isLoading} />
      </div>
    </form>
    </>
  );
};

export default AddSocialMedia;
