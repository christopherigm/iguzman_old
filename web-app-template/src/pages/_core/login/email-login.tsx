/* eslint-disable max-lines-per-function */
import React, {
  FormEvent,
  useRef,
  useState
} from 'react';
import EmailLoginFrom from './email-login-from';
import {
  SubTitle,
  ArrayErrorsToHTMLList
} from 'rrmc';
import { useNavigate } from 'react-router-dom';
import APISDK from 'src/api/api-sdk';
import { useDispatch } from 'react-redux';
import { OpenGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';
import { GlobalAlertSizeOptions } from 'src/components/_core/global-alert-dialog';

const EmailLogin = ( porps: any ): React.ReactElement => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRef: any = useRef(null);
  const dispatch = useDispatch();

  const loginUser = (e: FormEvent) => {
    e.preventDefault();
    porps.setIsLoading(true);
    APISDK.Login({
      email: email,
      password: password
    })
      .then(() => {
        formRef.current.reset();
        setEmail('');
        setPassword('');
        return navigate('/');
      })
      .catch((error: any) => {
        console.log(error);
        if ( !error.response ) {
          dispatch(OpenGlobalAlertDialog({
            dialog: 'login-failure',
            size: GlobalAlertSizeOptions.medium
          }));
          return;
        }
        const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
        dispatch(OpenGlobalAlertDialog({
          dialog: 'login-failure',
          size: GlobalAlertSizeOptions.medium,
          messageVariables: {
            errorMessages: errorMessages,
            status: error.response.status,
            statusText: error.response.statusText,
            email: email
          }
        }));
      })
      .finally(() => {
        porps.setIsLoading(false);
      });
  };

  return (
    <>
      <div className='col s12'>
        <SubTitle text='Login con correo' />
      </div>
      <EmailLoginFrom
        formRef={formRef}
        email={email}setEmail={setEmail}
        password={password} setPassword={setPassword}
        loginUser={loginUser}
        isLoading={porps.isLoading} />
    </>
  );
};

export default EmailLogin;
