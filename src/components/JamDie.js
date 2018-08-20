import React from 'react';
import PropTypes from 'prop-types';

const JamDie = ({message, dieClasses, clickFn}) => {
  
  let classArray = dieClasses.concat(['square', 'card', message]);

  return (
    <div id="message" className={classArray.join(' ')}  onClick={clickFn}><h2 className="message">{message}</h2></div>  
  );
};

const { string } = PropTypes;

JamDie.propTypes = {
  message: string.isRequired,
  dieClasses: PropTypes.array.isRequired,
  clickFn: PropTypes.func
};


export default JamDie;
