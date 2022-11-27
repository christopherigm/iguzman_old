import axios from 'axios';
import SystemValues, {
  SystemInterface
} from 'src/constants/SystemValues';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';
import { OpenGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';
import { GlobalAlertSizeOptions } from 'src/components/_core/global-alert-dialog';

const systemValues = SystemValues.getInstance();
const instance = axios.create({
  headers: {
    'Content-Type': 'application/vnd.api+json'
  }
});

const setLoading = ( isLoading: boolean ): void => {
  const isLoadingArray = SystemValues.getInstance().system.isLoading;
  if ( isLoading ) {
    isLoadingArray.push(true);
  } else {
    isLoadingArray.pop();
  }
  store.dispatch(SetSystemData({
    isLoading: isLoadingArray
  }));
};

export const APIGet = ( endpoint: string, includeBaseURL = true ): Promise<any> => {
  return new Promise((res, rej) => {
    const system: SystemInterface = store.getState().system;
    const accessToken = system.accessToken;
    const url = `${systemValues.apiBaseUrl}${endpoint}`;
    setLoading(true);
    instance.get(includeBaseURL ? url : endpoint, {
      headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
      }
    })
      .then((response) => {
        setLoading(false);
        return res(response.data);
      })
      .catch((error) => {
        setLoading(false);
        store.dispatch(OpenGlobalAlertDialog({
          dialog: 'http-request-failed',
          size: GlobalAlertSizeOptions.medium
        }));
        console.log(
          '\n====== APIGet Error ======',
          '\nURL:', url,
          '\nJWT:', accessToken
        );
        return rej(error);
      });
  });
};

export const APIPost = ( endpoint: string, data: any, includeBaseURL = true ): Promise<any> => {
  return new Promise((res, rej) => {
    const system: SystemInterface = store.getState().system;
    const accessToken = system.accessToken;
    const url = `${systemValues.apiBaseUrl}${endpoint}`;
    setLoading(true);
    instance.post(includeBaseURL ? url : endpoint, data, {
      headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
      }
    })
      .then((response) => {
        setLoading(false);
        return res(response.data);
      })
      .catch((error) => {
        setLoading(false);
        store.dispatch(OpenGlobalAlertDialog({
          dialog: 'http-request-failed',
          size: GlobalAlertSizeOptions.medium
        }));
        console.log(
          '\n====== APIPost Error ======',
          '\nData sent:', data,
          '\nURL:', url,
          '\nJWT:', accessToken,
          '\nstore', store.getState().system.user
        );
        return rej(error);
      });
  });
};

export const APIPatch = ( endpoint: string, data: any, includeBaseURL = true ): Promise<any> => {
  return new Promise((res, rej) => {
    const system: SystemInterface = store.getState().system;
    const accessToken = system.accessToken;
    const url = `${systemValues.apiBaseUrl}${endpoint}`;
    setLoading(true);
    instance.patch(includeBaseURL ? url : endpoint, data, {
      headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
      }
    })
      .then((response) => {
        setLoading(false);
        return res(response.data);
      })
      .catch((error) => {
        setLoading(false);
        store.dispatch(OpenGlobalAlertDialog({
          dialog: 'http-request-failed',
          size: GlobalAlertSizeOptions.medium
        }));
        console.log(
          '\n====== APIPatch Error ======',
          '\nData sent:', data,
          '\nURL:', url,
          '\nJWT:', accessToken
        );
        return rej(error);
      });
  });
};

export const APIDelete = ( endpoint: string, includeBaseURL = true ): Promise<any> => {
  return new Promise((res, rej) => {
    const system: SystemInterface = store.getState().system;
    const accessToken = system.accessToken;
    const url = `${systemValues.apiBaseUrl}${endpoint}`;
    setLoading(true);
    instance.delete(includeBaseURL ? url : endpoint, {
      headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
      }
    })
      .then((response) => {
        setLoading(false);
        return res(response.data);
      })
      .catch((error) => {
        setLoading(false);
        store.dispatch(OpenGlobalAlertDialog({
          dialog: 'http-request-failed',
          size: GlobalAlertSizeOptions.medium
        }));
        return rej(error);
      });
  });
};
