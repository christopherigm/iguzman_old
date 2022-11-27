/* eslint-disable max-lines */
import packageJSON from './version.json';
import * as c from './Constants';

export const FILE_PREFIX = {
  ANDROID: 'file:///android_asset/www'
};
export const SYSTEM_DATA = 'SYSTEM_DATA';
export const USER_DATA = 'USER_DATA';

const {
  REACT_APP_API_URL,
  REACT_APP_IS_MOBILE_APP,
  REACT_APP_BRANCH_NAME,
  REACT_APP_FACEBOOK_APP_ID
} = process.env;

/* eslint-disable no-unused-vars */
export enum ReducerActions {
  add = 'add',
  update = 'update',
  read = 'read'
}
/* eslint-enable no-unused-vars */

export interface SystemInterface {
  // ========== BASE - COMMON VALUES INIT ==========
  isLoading: Array<boolean>;
  darkMode: boolean;
  platform: {
    os: string;
    prefix: string;
  }
  configurations: {
    site_name: string;
    img_logo: string;
    privacy_policy: string;
    terms_and_conditions: string;
    user_data: string;
  };
  globalAlert: any;
  cart: Array<any>;
  orders: Array<any>;
  accessToken: string;
  refreshToken: string;
  changeLog: Array<any>;
  profile: {
    newsletter: boolean;
    promotions: boolean;
    is_seller: boolean;
    img_picture: string;
    biography: string;
    owner_position: string;
    owner_position_description: string;
    owner_phone: string;
    owner_office_phone: string;
    owner_email: string;
    owner_whatsapp: string;
    owner_address: string;
  };
  user: {
    id: number;
    attributes: {
      username: string;
      email: string;
      last_login: string;
      first_name: string;
      last_name: string;
      is_superuser: boolean;
      date_joined: string;
      is_active: boolean;
      is_staff: boolean;
      profile: {
        id: number,
        newsletter: boolean;
        promotions: boolean;
        is_seller: boolean;
        img_picture: string;
        biography: string;
        owner_position: string;
        owner_position_description: string;
        owner_phone: string;
        owner_office_phone: string;
        owner_email: string;
        owner_whatsapp: string;
        owner_address: string;
      }
    }
  }
  addresses: Array<any>;
  // ========== BASE - COMMON VALUES INIT ==========
  homePictures: Array<any>;
}

const systemDefaultState: SystemInterface = {
  // ========== BASE - COMMON VALUES INIT ==========
  isLoading: [],
  darkMode: false,
  platform: {
    os: 'web',
    prefix: ''
  },
  configurations: {
    site_name: '',
    img_logo: '/assets/logo.png',
    privacy_policy: '',
    terms_and_conditions: '',
    user_data: ''
  },
  globalAlert: {},
  cart: [],
  orders: [],
  accessToken: '',
  refreshToken: '',
  changeLog: [],
  profile: {
    newsletter: false,
    promotions: false,
    is_seller: false,
    img_picture: '',
    biography: '',
    owner_position: '',
    owner_position_description: '',
    owner_phone: '',
    owner_office_phone: '',
    owner_email: '',
    owner_whatsapp: '',
    owner_address: ''
  },
  user: {
    id: 0,
    attributes: {
      username: '',
      email: '',
      last_login: '',
      first_name: '',
      last_name: '',
      is_superuser: false,
      date_joined: '',
      is_active: true,
      is_staff: false,
      profile: {
        id: 0,
        newsletter: false,
        promotions: false,
        is_seller: false,
        img_picture: '',
        biography: '',
        owner_position: '',
        owner_position_description: '',
        owner_phone: '',
        owner_office_phone: '',
        owner_email: '',
        owner_whatsapp: '',
        owner_address: ''
      }
    }
  },
  addresses: [],
  // ========== BASE - COMMON VALUES INIT ==========
  homePictures: []
};


export interface StateInterface {
  system: SystemInterface
}

class SystemValues {
  // ========== BASE - COMMON VALUES INIT ==========
  static _instance: SystemValues;
  private _hostname: string;
  private _apiBaseUrl: string;
  private _isMobileApp: boolean;
  private _branchName: string;
  private _version: string;
  private _facebookAppID: string;
  private _language: string;
  private _primaryColorName: string;
  private _primaryColorValue: string;
  private _searchAvailable: boolean;
  private _appEnabled: boolean;
  private _changelogEnabled: boolean;
  private _system: SystemInterface;

  constructor() {
    // ========== BASE - COMMON VALUES INIT ==========
    let DOMData: any = {};
    const domData = window.document.getElementById('data');
    if ( domData && domData.innerText && domData.innerText !== '{{{escapeJS data}}}' ) {
      DOMData = JSON.parse(domData.innerText);
      if (DOMData) {
        if (DOMData.hostname) {
          this._hostname = DOMData.hostname;
        }
      }
    }
    this._hostname = DOMData.hostname ? DOMData.hostname : 'no-hostname';
    this._apiBaseUrl = REACT_APP_API_URL ? REACT_APP_API_URL : c.DEFAULT_API_URL;
    this._isMobileApp = REACT_APP_IS_MOBILE_APP ? true : false;
    this._branchName = REACT_APP_BRANCH_NAME ? REACT_APP_BRANCH_NAME : 'local-branch';
    this._version = packageJSON ? packageJSON.version : '0.0.0';
    this._facebookAppID = REACT_APP_FACEBOOK_APP_ID ? REACT_APP_FACEBOOK_APP_ID : '-';
    this._language = c.DEFAULT_LANGUAGE;
    this._searchAvailable = c.SEARCH_BOX_AVAILABLE;
    this._primaryColorName = c.PRIMARY_COLOR_NAME;
    this._primaryColorValue = c.PRIMARY_COLOR_VALUE;
    this._appEnabled = c.APP_ENABLED;
    this._changelogEnabled = c.CHANGELOG_ENABLED;
    this._system = systemDefaultState;
    // ========== BASE - COMMON VALUES ENDS ==========
  }

  // ========== BASE - COMMON VALUES INIT ==========
  static getInstance(): SystemValues {
    if ( !SystemValues._instance ) {
      SystemValues._instance = new SystemValues();
    }
    return SystemValues._instance;
  }

  public get hostname(): string {
    return this._hostname;
  }

  public get language(): string {
    return this._language;
  }

  public get apiBaseUrl(): string {
    return this._apiBaseUrl;
  }

  public get isMobileApp(): boolean {
    return this._isMobileApp;
  }

  public get branchName(): string {
    return this._branchName;
  }

  public get version(): string {
    return this._version;
  }

  public get primaryColorName(): string {
    return this._primaryColorName;
  }

  public get primaryColorValue(): string {
    return this._primaryColorValue;
  }

  public get facebookAppID(): string {
    return this._facebookAppID;
  }

  public get searchAvailable(): boolean {
    return this._searchAvailable;
  }

  public get appEnabled(): boolean {
    return this._appEnabled;
  }

  public get changelogEnabled(): boolean {
    return this._changelogEnabled;
  }

  public get system(): SystemInterface {
    return this._system;
  }

  public set system(data: SystemInterface) {
    this._system = data;
  }

  public SystemReducer(initialState = SystemValues.getInstance().system, action: any) {
    if ( action && action.type === SYSTEM_DATA ) {
      SystemValues.getInstance().system = {
        ...initialState,
        ...action.data
      };
    }
    return SystemValues.getInstance().system;
  }
  // ========== CUSTOME VALUES ENDS ==========
}

export default SystemValues;
