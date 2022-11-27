import React from 'react';
import './form-components.scss';

const GenericTextInput = (props: any): React.ReactElement => {
  return (
    <div className='input-field col s12 m6 GenericTextInput'>
      <input
        id={props.id}
        type={props.type}
        disabled={props.disabled}
        onChange={( e: any ) => {
          const value = e.target.value;
          props.setValue(value);
          if ( props.onChange ) props.onChange(value);
        }}
        defaultValue={props.value}
        placeholder={props.placeholder}
        required={props.required} />
      <div>
        <span className='cyan-text GenericTextInput__placeholder'>
          {props.placeholder}
        </span>
        {
          props.required ?
            <span className='red-text GenericTextInput__placeholder'>
              {' (requerido)'}
            </span> : null
        }
      </div>
      <label htmlFor={props.id} className='hide'>-</label>
    </div>
  );
};

export default GenericTextInput;
