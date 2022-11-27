import React from 'react';
import './basic-icon.scss';

const BasicIcon = (props: any): React.ReactElement => {
  const Link = props.Link;
  const link = props.link;
  const external = props.link && props.link.search(/\:\/\//g) >= 0 ? true : false;
  const action = props.action;

  return (
    <>
    {
      action ?
        <a className={`BasicIcon material-icons ${props.color} waves-effect waves-light ${props.noPadding ? 'BasicIcon--no-padding' : ''} ${props.disabled ? 'disabled' : ''}`}
          onClick={action} >
          {props.icon}
        </a> : link ?
        <>
          {
            external ?
            <a rel='noreferrer'
              className={`BasicIcon material-icons ${props.color} waves-effect waves-light ${props.noPadding ? 'BasicIcon--no-padding' : ''} ${props.disabled ? 'disabled' : ''}`}
              href={props.link}
              target='_blank'>
              {props.icon}
            </a> :
            <Link
              className={`BasicIcon material-icons ${props.color} waves-effect waves-light ${props.noPadding ? 'BasicIcon--no-padding' : ''} ${props.disabled ? 'disabled' : ''}`}
              to={props.link}>
              {props.icon}
            </Link>
          }
          </> :
        <div className={`BasicIcon material-icons ${props.color} ${props.noPadding ? 'BasicIcon--no-padding' : ''} ${props.disabled ? 'disabled' : ''}`}>
          {props.icon}
        </div>
    }
    </>
  );
};

export default BasicIcon;
