import React, {
  useRef
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';

const EmailLoginFrom = ( props: any ): React.ReactElement => {
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);

  const validForm = (): boolean => {
    if ( !props.email || !props.password ) {
      return false;
    }
    return true;
  };
  return (
    <form onSubmit={props.loginUser} ref={props.formRef}>
      <div className='input-field col s12'>
        <input id='email' type='email' className='validate'
          onChange={( e: any ) => props.setEmail(e.target.value)}
          ref={emailRef} disabled={props.isLoading} />
        <label htmlFor='email'>Correo electronico</label>
      </div>
      <div className='input-field col s12'>
        <input id='password' type='password' className='validate'
          onChange={( e: any ) => props.setPassword(e.target.value)}
          ref={passwordRef} disabled={props.isLoading} />
        <label htmlFor='password'>Contrasena</label>
      </div>
      <div className='col s12'>
        <HorizontalSpace size={SizesEnum.small} />
      </div>
      <div className='col s12'>
        <input id='submit' type='submit'
          value='Login'
          className='waves-effect waves-light btn right cyan darken-1 right white-text'
          disabled={!validForm()} />
      </div>
    </form>
  );
};

export default EmailLoginFrom;
