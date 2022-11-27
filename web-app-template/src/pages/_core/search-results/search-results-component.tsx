import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import ParallaxHeaderImage from 'src/components/_core/parallax-header-image';

const headerPictureFile = '/assets/search-bg.jpg';

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SearchResults = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;
  const params: any = useQuery();
  const query: string = params.get('q');
  const title = `${props.results.count ? props.results.count : 0} resultado${props.results.count > 1 ? 's' : ''} para "${query}".`;

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title={title} />
      <div className='container'>
        <HorizontalSpace size={SizesEnum.small} />
      </div>
    </>
  );
};

export default SearchResults;
