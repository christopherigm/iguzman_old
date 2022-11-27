import React, {
  useState,
  useEffect
} from 'react';
import { FavoriteButton } from 'rrmc';

interface FavoriteButtonAdapterInterface {
  item: any;
}

const FavoriteButtonAdapter = ( props: FavoriteButtonAdapterInterface ): React.ReactElement => {
  // const item: any = props.item;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <>
      <FavoriteButton
        isFavorite={isFavorite}
        onFavoriteButtonClick={setIsFavorite}
        isLoading={isLoading} />
    </>
  );
};

export default FavoriteButtonAdapter;
