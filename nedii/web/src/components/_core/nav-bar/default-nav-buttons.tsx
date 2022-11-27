import React, {
  useEffect
} from 'react';
import SystemValues from 'src/constants/SystemValues';
import menus from 'src/constants/strings/default-menu.json';

interface DefaultNavButtonsInterface {
  sectionMenu: Array<any>;
  setSectionMenu: CallableFunction;
}

const DefaultNavButtons = (props: DefaultNavButtonsInterface): React.ReactElement => {
  useEffect(() => {
    const language = SystemValues.getInstance().language;
    const menu = [...props.sectionMenu];
    if ( language === 'en' ) {
      menus.en.forEach((i: any) => {
        if ( !menu.find((j: any) => j.text === i.text) ) {
          menu.push(i);
        }
      });
    } else {
      menus.es.forEach((i: any) => {
        if ( !menu.find((j: any) => j.text === i.text) ) {
          menu.push(i);
        }
      });
    }
    props.setSectionMenu(menu);
  }, [props.setSectionMenu]);
  return (<></>);
};

export default DefaultNavButtons;
