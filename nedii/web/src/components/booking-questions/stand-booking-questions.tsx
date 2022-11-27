import React from 'react';

const Options = (props: any): React.ReactElement => {
  return (
    <>
    {
      props.openAnswer ? <input className='StandComponentsQuestions__openAnswer' type='text' placeholder='Ingrese su respuesta'/> :
        props.options.data.map((option: any, index: number) => {
          return (
            <label className='StandComponentsQuestions__cloceAnswer' key={index}>
              <input name={props.questionid} type='radio' />
              <span className='StandComponentsQuestions__mark'>{option.attributes.value}</span>
            </label>
          );
        })
    }
    </>
  );
};

const StandComponentsQuestions = (props: any): React.ReactElement => {
  return (
    <div className='StandComponentsQuestions'>
      {
        props.questions.data.map((question: any, index: number) => {
          return (
            <div className='StandComponentsQuestions__question' key={index}>
              <span>{question.attributes.name}:</span>
              <Options
                questionid={question.id}
                openAnswer={question.attributes.open_answer}
                options={question.relationships.options}/>
            </div>
          );
        })
      }
      <div className='StandComponentsQuestions__button center-align'>
        <input className='btn red white-text' type="submit" value='Enviar' />
      </div>
    </div>
  );
};

const StandBookingQuestions = (props: any): React.ReactElement => {
  return (
    <div className='container'>
      <div className='col m1 hide-on-small-only'></div>
      <div className='col s12 m10'>
        <StandComponentsQuestions questions={props.questions}/>
      </div>
      <div className='col m1 hide-on-small-only'></div>
    </div>
  );
};

export default StandBookingQuestions;
