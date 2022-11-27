/* eslint-disable max-lines-per-function */
import React, {
  FormEvent,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  SubTitle,
  ArrayErrorsToHTMLList
} from 'rrmc';
import { OpenGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';
import { GlobalAlertSizeOptions } from 'src/components/_core/global-alert-dialog';
import EmailFrom from './email-from';
import APISDK from 'src/api/api-sdk';


const EmailRegistration = ( porps: any ): React.ReactElement => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const formRef: any = useRef(null);
  const dispatch = useDispatch();

  // const onCloseEnd = () => {
  //   modal.close();
  //   if ( modalSuccess ) return navigate('/login');
  // };

  const registerUser = (e: FormEvent) => {
    e.preventDefault();
    porps.setIsLoading(true);
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: email,
      password: password
    };
    APISDK.RegisterUser(data)
      .then(() => {
        dispatch(OpenGlobalAlertDialog({
          dialog: 'registration-success',
          size: GlobalAlertSizeOptions.medium,
          messageVariables: {
            firstName: firstName
          }
        }));
        formRef.current.reset();
        setEmail('');
        setPassword('');
        setFirstName('');
        return navigate('/');
      })
      .catch((error: any) => {
        console.log('ssasasasa', error);
        if ( !error.response ) {
          dispatch(OpenGlobalAlertDialog({
            dialog: 'registration-generic-failure',
            size: GlobalAlertSizeOptions.medium,
            messageVariables: {
              firstName: firstName,
              email: email
            }
          }));
          return;
        }
        const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
        dispatch(OpenGlobalAlertDialog({
          dialog: 'registration-generic-failure',
          size: GlobalAlertSizeOptions.medium,
          messageVariables: {
            firstName: firstName,
            status: error.response.status,
            statusText: error.response.statusText,
            errorMessages: errorMessages
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
        <SubTitle text='Registro con correo' />
      </div>
      <EmailFrom formRef={formRef}
        firstName={firstName} setFirstName={setFirstName}
        lastName={lastName} setLastName={setLastName}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        passwordConf={passwordConf} setPasswordConf={setPasswordConf}
        registerUser={registerUser} isLoading={porps.isLoading} />
    </>
  );
};

export default EmailRegistration;
