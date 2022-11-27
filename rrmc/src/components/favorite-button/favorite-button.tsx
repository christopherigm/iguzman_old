import React from 'react';
import './favorite-button.scss';

interface FavoriteButtonInterface {
  isFavorite: boolean;
  isLoading?: boolean;
  onFavoriteButtonClick?: CallableFunction;
}

const FavoriteButton = (props: FavoriteButtonInterface): React.ReactElement => {
  return (
    <div
      className={`material-icons red-text FavoriteButton ${props.isLoading ? 'IsLoadingOpacity' : ''}`}
      onClick={() => {
      if ( props.isLoading ) return;
      if ( props.onFavoriteButtonClick ) {
        props.onFavoriteButtonClick();
      }
    }}>
      {
        props.isFavorite ?
          <>favorite</> : <>favorite_border</>
      }
    </div>
  );
};

export default FavoriteButton;
