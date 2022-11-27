import React, {
  useRef,
  useEffect
} from 'react';
import './form-components.scss';
import * as M from 'materialize-css';

interface GenericSelectInputItemInterface {
  value: number;
  text: string;
}
interface GenericSelectInputInterface {
  id: string;
  value: any;
  setValue: CallableFunction;
  onChange?: CallableFunction;
  placeholder: string;
  items: Array<GenericSelectInputItemInterface>;
  disabled?: boolean;
  required?: boolean;
}

const GenericSelectInput = (props: GenericSelectInputInterface): React.ReactElement => {
  const selectRef: any = useRef(null);
  const items = props.items;

  useEffect(() => {
    M.FormSelect.init(selectRef.current);
  }, [M]);

  return (
    <div className='input-field col s12 m6 GenericTextInput'>
      <select
        defaultValue={props.value ? props.value : ''}
        id={props.id}
        title={props.id}
        ref={selectRef}
        disabled={props.disabled}
        required={props.required}
        onChange={( e: any ) => {
          const value = e.target.value;
          props.setValue(value);
          if ( props.onChange ) props.onChange(value);
        }}>
        <option value='' disabled>Seleccione una opcion</option>
        {
          items.map((i: GenericSelectInputItemInterface, index: number) => {
            return (
              <option key={index} value={i.value}>{i.text}</option>
            );
          })
        }
      </select>
      <span className='cyan-text GenericTextInput__placeholder'>
        {props.placeholder}
      </span>
      <label htmlFor={props.id} className='hide'>-</label>
    </div>
  );
};

export default GenericSelectInput;
