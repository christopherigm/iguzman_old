import SystemValues, {
  SYSTEM_DATA
} from 'src/constants/SystemValues';
import GlobalAlertDialogsJSON from 'src/constants/strings/global-alert-dialogs.json';
import { GlobalAlertSizeOptions } from 'src/components/_core/global-alert-dialog';

const systemValues = SystemValues.getInstance();

const TemplateParser = (expression:string, valueObj: any) => {
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  const text = expression.replace(templateMatcher, (_substring, value) => {
    value = valueObj[value];
    return value;
  });
  return text;
};

interface OpenGlobalAlertDialogInterface {
  dialog: string;
  size?: GlobalAlertSizeOptions;
  title?: string;
  titleVariables?: any
  message?: string;
  messageVariables?: any
}

export const OpenGlobalAlertDialog = ( props: OpenGlobalAlertDialogInterface ): any => {
  const j: any = { ...GlobalAlertDialogsJSON };
  const newState = {
    globalAlert: {
      active: true,
      success: j[systemValues.language][props.dialog].success,
      title: props.title ? props.title : j[systemValues.language][props.dialog].title,
      message: props.message ? TemplateParser(props.message, props.messageVariables) : TemplateParser(j[systemValues.language][props.dialog].message, props.messageVariables),
      size: props.size ? props.size : GlobalAlertSizeOptions.small
    }
  };
  return {
    type: SYSTEM_DATA,
    data: newState
  };
};

export const CloseGlobalAlertDialog = (): any => {
  const newState = {
    globalAlert: {
      active: false
    }
  };
  return {
    type: SYSTEM_DATA,
    data: newState
  };
};
