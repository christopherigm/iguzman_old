import React from 'react';
import './form-components.scss';

const GenericTextArea = (props: any): React.ReactElement => {
  return (
    <div className='input-field col s12 GenericTextArea'>
      <textarea
        id={props.id}
        rows={4}
        cols={50}
        className='materialize-textarea'
        disabled={props.disabled}
        onChange={( e: any ) => {
          const value = e.target.value;
          props.setValue(value);
          if ( props.onChange ) props.onChange(value);
        }}
        defaultValue={props.value}
        placeholder={props.placeholder} />
      <span className='cyan-text GenericTextInput__placeholder'>
        {props.placeholder}
      </span>
      <label htmlFor={props.id} className='hide'>-</label>
    </div>
  );
};

export default GenericTextArea;
