/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, {
  useEffect,
  useRef
} from 'react';
import * as M from 'materialize-css';
import {
  getIcon,
  getType
} from './helpers';

const TaskItem = ( props: any ): React.ReactElement => {
  const tableRef: any = useRef(null);

  useEffect(() => {
    M.Collapsible.init(tableRef.current, {});
  }, [M]);

  return (
    <ul className='collapsible' ref={tableRef}>
    {
      props.items.data.map((i: any, index: number) => {
        return (
          <li key={index}>
            <div className='collapsible-header ChangeLog__header'>
              <i className={`material-icons ChangeLog__icon--${i.attributes.task_type}`}>
                {getIcon(i.attributes.task_type)}
              </i>
              <div className='ChangeLog__task-name'>
                <span>{i.attributes.task_name}</span>
                <span className='hide-on-small-only'> ({i.attributes.hours} hora{i.attributes.hours !== 1 ? 's' : ''})</span>
              </div>
              <span className='ChangeLog__user-name hide-on-small-only'>
                {i.relationships.user.data.attributes.first_name}
              </span>
            </div>
            <div
              className='collapsible-body ChangeLog__description'>
                <div>
                  <b>Autor:</b> {i.relationships.user.data.attributes.first_name} {i.relationships.user.data.attributes.last_name}
                </div>
                <div>
                  <b>Tipo de tarea:</b> {getType(i.attributes.task_type)}
                </div>
                <div>
                  <b>Tiempo de desarrollo:</b> {i.attributes.hours} hora{i.attributes.hours !== 1 ? 's' : ''}
                </div>
                <div><b>Comentarios:</b></div>
                <div dangerouslySetInnerHTML={{
                  __html: i.attributes.description
                }}></div>
              </div>
          </li>
        );
      })
    }
    </ul>
  );
};

export default TaskItem;
