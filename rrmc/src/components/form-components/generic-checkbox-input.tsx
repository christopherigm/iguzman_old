import React from 'react';
import './form-components.scss';

const GenericCheckboxInput = (props: any): React.ReactElement => {
  return (
    <div className='input-field col s6 m4 GenericCheckboxInput'>
      <label htmlFor={props.id}>
        <input
          id={props.id}
          type='checkbox'
          className='filled-in'
          onChange={( e: any ) => {
            const value = e.target.checked;
            props.setValue(value);
            if ( props.onChange ) props.onChange(value);
          }}
          defaultChecked={props.checked} />
        <span className='grey-text text-darken-3 truncate GenericCheckboxInput__placeholder'>
          {props.placeholder}
        </span>
      </label>
    </div>
  );
};

export default GenericCheckboxInput;
