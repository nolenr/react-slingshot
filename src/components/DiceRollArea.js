import React from 'react';
import PropTypes from 'prop-types';



const DiceRollArea = ({title, description, rollFn, rolledClass, isLocked, lockFn, clearRolledClass}) => (  

  <div className="wrapper">
    <div className="dice-roll-wrap">
      <div className="jam-die">
        <div id={title} className={ `square card ${title} ${rolledClass}` }  onClick={rollFn} onAnimationEnd={clearRolledClass}><h2 className="message">{title}</h2></div>
      </div>
      
      <div className="card die-options-card">
        <button className={`knob ${ isLocked ? 'locked' : null}`} onClick={ (lockFn) }>
          <p className="knob-label">{ !isLocked ? "lock" : "unlock"}</p>
        </button>
      </div>
      
      <div className="card output-card">  
        <div className="output-text-area">
          <p className="card-pretext">
            { title==="groove" ? "Let's choose a groove, how about..." : "" }
            { title=== "chords" ? "Here are some chords we can use to get started..." : "" } 
            { title=== "bonus" ? "And if you want a bonus challenge..." : "" }
          </p>
          <p className={title}>{description}</p>
        </div>
      </div>
    </div>  
  </div>
);

const { string } = PropTypes;

DiceRollArea.propTypes = {
  title: string.isRequired,
  rollFn: PropTypes.any,
  description: PropTypes.any,
  dieClasses: PropTypes.any,
  clearRolledClasses: PropTypes.any
 };

export default DiceRollArea;
