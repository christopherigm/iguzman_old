import React from 'react';
import './loading-indicator.scss';

interface LoadingIndicatorInterface {
  isLoading: boolean;
}

const LoadingIndicator = (props: LoadingIndicatorInterface): React.ReactElement => {
  const isLoading = props.isLoading;

  return (
    <>
    {
      isLoading || true ?
        <div className={`GenericCard LoadingIndicator ${
          isLoading ? 'LoadingIndicator__active' : ''
        }`}>
          <span className='LoadingIndicator__text'>Loading...</span>
          <div className='progress'>
            <div className='indeterminate'></div>
          </div>
        </div> : null
    }
    </>
  );
};

export default LoadingIndicator;
