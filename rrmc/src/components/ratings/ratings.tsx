import React, {
  useRef,
  useEffect
} from 'react';
import SizesEnum from '../_common-interfaces/sizes-enum';
import * as M from 'materialize-css';
import './ratings.scss';

interface RatingsInterface {
  score: number;
  size: SizesEnum;
  colorOn?: string;
  tooltip?: string;
  centered?: boolean;
  onClick?: CallableFunction;
}

const Ratings = (props: RatingsInterface): React.ReactElement => {
  const starComponentRef: any = useRef(null);
  useEffect(() => {
    M.Tooltip.init(starComponentRef, {});
  }, [M]);

  const score = props.score > 5 ? 5 : props.score;
  const scoreOn = Math.round(score);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const star = {
      index: i + 1,
      on: false
    };
    if ( i < scoreOn ) star.on = true;
    stars.push(star);
  }
  const colorOn = props.colorOn ? props.colorOn : 'yellow-text text-darken-2';
  const colorOff = props.colorOn ? props.colorOn : 'white-text';
  const size = props.size ? props.size : 'medium';

  return (
    <div
      className='tooltipped Ratings'
      data-position='bottom'
      data-tooltip={props.tooltip}
      ref={starComponentRef}
      style={{
        margin: props.centered ? '0 auto' : ''
      }}>
      {
        stars.map((i: any) => {
          return (
            <em
              key={i.index}
              onClick={() => {
                if ( props.onClick ) {
                  props.onClick(i.index);
                }
              }}
              className={`material-icons Ratings__star Ratings__star--${size} ${
                i.on ? colorOn : colorOff
              }`}>star</em>
          );
        })
      }
    </div>
  );
};

export default Ratings;
