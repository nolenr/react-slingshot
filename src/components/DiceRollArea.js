import React from 'react';
import PropTypes from 'prop-types';
import JamDie from './JamDie.js';

let isLocked = false;

const DiceRollArea = ({title, description, rollFn, dieClasses, lockFn}) => (  
  <div className="wrapper">
    <div className="dice-roll-wrap">
      <div className="jam-die">
        <JamDie message={title} dieClasses={dieClasses} clickFn={rollFn} />
      </div>
      
      <div className="card die-options-card">
        <button className={"knob"} onClick={isLocked = !isLocked}>
          <p className="knob-label">lock</p>
        </button>
      </div>
      
      <div className="card output-card">  
        <div className="output-text-area">
          { title && title.length ?
          <p className="card-pretext">
            { title==="groove" ? "Let's choose a groove, how about..." : "" }
            { title=== "chords" ? "Here are some chords we can use to get started..." : "" } 
            { title=== "bonus" ? "And if you want a bonus challenge..." : "" }
          </p> :
          <p className="card-pretext">
            { title==="groove" ? "We will need to choose a type of groove to play..." : "" }
            { title=== "chords" ? "And we'll need some chords as well.." : "" } 
            { title=== "bonus" ? "And if you're up to it, try a bonus challenge..." : "" }
          </p>
          }
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
  dieClasses: PropTypes.any
 };

export default DiceRollArea;
