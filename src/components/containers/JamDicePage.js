import React from 'react';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DiceRollArea from '../DiceRollArea';

export class JamDicePage extends React.Component {
  
  constructor(props) {
    super (props);
    this.state = {
      grooveRolledClass: "",
      grooveDescription: "",
      grooveIsLocked: false,
      keyRolledClass: "",
      keyDescription: "",
      keyIsLocked: false,
      bonusRolledClass: "",
      bonusDescription: '',
      bonusIsLocked: false,
    }
    this.rollAllDice = this.rollAllDice.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
    this.toggleGrooveLock = this.toggleGrooveLock.bind(this);
    this.toggleKeyLock = this.toggleKeyLock.bind(this);
    this.toggleBonusLock = this.toggleBonusLock.bind(this);
    this.clearRolledClasses = this.clearRolledClasses.bind(this);
  }

  clearHandler() {
    console.log("state being cleared");
    this.setState({
      grooveRolledClass: "",
      grooveDescription: "",
      grooveIsLocked: false,
      keyRolledClass: "",
      keyDescription: "",
      keyIsLocked: false,
      bonusRolledClass: "",
      bonusDescription: "",
      bonusIsLocked: false,
    });
  }

  clearRolledClasses() {
    this.setState({
      grooveRolledClass: "",
      keyRolledClass: "",
      bonusRolledClass: "",
    });
  }

  clickHandler() {
    this.rollAllDice();
  }
  
  //Roll all dice. Check to see if each die is locked, if not, get a new description and add trigger animation
  rollAllDice() {
    let newState={}

    if(!this.state.grooveIsLocked) {
      newState.grooveRolledClass = "rolled";
      newState.grooveDescription = getRandomGroove();
    }
    if(!this.state.keyIsLocked) {
      newState.keyRolledClass = "rolled";
      newState.keyDescription = getChordsList();
    }
    if(!this.state.bonusIsLocked) {
      newState.bonusRolledClass = "rolled";
      newState.bonusDescription = getRandomBonus();
    }
    this.setState(newState);
  }

  toggleGrooveLock () {
    let newState = {
      grooveIsLocked: !this.state.grooveIsLocked,
    }
    
    this.setState(newState);
  }

  toggleKeyLock () {
    let newState = {
      keyIsLocked: !this.state.keyIsLocked,
    }
    
    this.setState(newState);
  }

  toggleBonusLock () {
    let newState = {
      bonusIsLocked: !this.state.bonusIsLocked,
    }
    
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <div className="play-area">
          <DiceRollArea 
            title="groove"  
            description={this.state.grooveDescription} 
            rollFn={this.rollGroove} 
            rolledClass={this.state.grooveRolledClass}
            lockFn = {this.toggleGrooveLock} 
            isLocked = {this.state.grooveIsLocked} 
            clearRolledClass= { this.clearRolledClasses }/>

          <DiceRollArea 
            title="chords" 
            description={this.state.keyDescription} 
            rollFn={this.rollGroove} 
            rolledClass={this.state.keyRolledClass}
            lockFn = {this.toggleKeyLock}
            isLocked = {this.state.keyIsLocked} 
            clearRolledClass= { this.clearRolledClasses } />
            

          <DiceRollArea 
            title="bonus" 
            description={this.state.bonusDescription}
            rollFn={this.rollGroove} 
            rolledClass={this.state.bonusRolledClass} 
            lockFn = {this.toggleBonusLock}
            isLocked = {this.state.bonusIsLocked} 
            clearRolledClass= { this.clearRolledClasses } />

          <div className="btn-flex-wrap">
            <div className="roll-button button-frame">
              <button className="roll" onClick={this.rollAllDice}><h3>Roll the Dice!</h3></button>
            </div>

            <div className="roll-button button-frame">
              <button className="roll-button" onClick={this.clearHandler}><h3>Clear</h3></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

JamDicePage.propTypes = {

};

//Logic for dice rolls to generate random grooves, chord progressions, and bonus challenges

function getRandomGroove() {
  return grooveTypes[Math.floor(Math.random()*grooveTypes.length)];
}

function getRandomBonus() {
    let challenge = bonusChallenges[Math.floor(Math.random()*bonusChallenges.length)];
    return challenge;
}

function getChordsList (keySlot) {
  let key;
      
      //if there isnt a keyslot specified, randomly choose a key
      if(!keySlot || !keySlot.value) {
          key = musicData[Math.floor(Math.random()*Math.floor(musicData.length))];
      }
      
      // If user provides a key for the jam via the Key slot, we validate it by looping through our musicData for a match
      if (keySlot && keySlot.value) {
      for (let c=0; c<musicData.length - 1; c++ ) {
              if (keySlot.value.toUpperCase() == musicData[c].KeyName.toUpperCase()) {
                  key = musicData[c];
              }
          }
      }
      
      //create a part
      let keyName = key.KeyName;
      
      //let selectedProgression = progressions[1]; //TODO: randomize selection of progressions
      let chordList = [keyName];
      
      //Generate an integer 2-6 for # of chords in the progression
      let numChords = 3 + Math.floor(Math.random()*3);
      
      while (chordList.length < numChords) {
          let chord = key[ordinalMap[Math.ceil(Math.random()*7)]];
          if (!chordList.includes(chord)) {
              chordList.push(chord);
          }
      }

      return chordList.toString();
}


function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default JamDicePage;


/* The data below should ultimately be accessed by REST service. V1 of Jam Dice uses static data, but future versions will enable users to build their own scales, repertoires, wishlists, etc.  */
//const music data
const musicData = [
    {KeyName: "A", Root: "A", Second: "Bm", Third: "C#m", Fourth: "D", Fifth: "E", Sixth: "F#m",  Seventh: "G#dim" },
    {KeyName: "Bb", Root: "Bb", Second: "Cm", Third: "Dm", Fourth: "Eb", Fifth: "F", Sixth: "Gm", Seventh: "Adim" },
    {KeyName: "B", Root: "B", Second: "C#m", Third: "D#m",  Fourth: "E", Fifth: "F#", Sixth: "G#m", Seventh: "A#dim" },
    {KeyName: "C", Root: "C", Second: "Dm", Third: "Em", Fourth: "F", Fifth: "G", Sixth: "Am", Seventh: "Bdim" },
    {KeyName: "Db", Root: "Db", Second: "Ebm",  Third: "Fm", Fourth: "Gb", Fifth: "Ab", Sixth: "Bbm", Seventh: "Cdim" },
    {KeyName: "D", Root: "D", Second: "Em", Third: "F#m",  Fourth: "G", Fifth: "A", Sixth: "Bm", Seventh: "C#dim" },
    {KeyName: "Eb", Root: "Eb", Second: "Fm", Third: "Gm", Fourth: "Ab", Fifth: "Bb", Sixth: "Cm", Seventh: "Ddim" },
    {KeyName: "E", Root: "E", Second: "F#m", Third: "G#m", Fourth: "A", Fifth: "B", Sixth: "C#m",  Seventh: "D#dim" },
    {KeyName: "F", Root: "F", Second: "Gm", Third: "Am", Fourth: "Bb", Fifth: "C", Sixth: "Dm", Seventh: "Edim" },
    {KeyName: "Gb", Root: "Gb", Second: "Abm", Third: "Bbm", Fourth: "B", Fifth: "Db", Sixth: "Ebm", Seventh: "Fdim" },
    {KeyName: "G", Root: "G", Second: "Am", Third: "Bm", Fourth: "C", Fifth: "D", Sixth: "Em", Seventh: "F#dim" },
    {KeyName: "Ab", Root: "Ab", Second: "Bbm", Third: "Cm", Fourth: "Db", Fifth: "Eb", Sixth: "Fm", Seventh: "Gdim" },
    
    {KeyName: "F#m", Root: "F#m",Second: "G#dim", Third: "A", Fourth: "Bm", Fifth: "C#m", Sixth: "D", Seventh: "E"},
    {KeyName: "Gm", Root: "Gm", Second: "Adim", Third: "Bb", Fourth: "Cm", Fifth: "Dm", Sixth: "Eb", Seventh: "F"},
    {KeyName: "G#m", Root: "G#m",Second: "A#dim", Third: "B", Fourth: "C#m", Fifth: "D#m", Sixth: "E", Seventh: "F#"},
    {KeyName: "Am", Root: "Am", Second: "Bdim", Third: "C", Fourth: "Dm", Fifth: "Em", Sixth: "F", Seventh: "G"},
    {KeyName: "Bbm", Root: "Bbm", Second: "Cdim", Third: "Db", Fourth: "Ebm", Fifth: "Fm", Sixth: "Gb", Seventh: "Ab"},
    {KeyName: "Bm", Root: "Bm", Second: "C#dim", Third: "D", Fourth: "Em", Fifth: "F#m", Sixth: "G", Seventh: "A"},
    {KeyName: "Cm", Root: "Cm", Second: "Ddim", Third: "Eb", Fourth: "Fm", Fifth: "Gm", Sixth: "Ab", Seventh: "Bb"},
    {KeyName: "C#m", Root: "C#m",Second: "D#dim", Third: "E", Fourth: "F#m", Fifth: "G#m", Sixth: "A", Seventh: "B"},
    {KeyName: "Dm", Root: "Dm", Second: "Edim", Third: "F", Fourth: "Gm", Fifth: "Am", Sixth: "Bb", Seventh: "C"},
    {KeyName: "Ebm", Root: "Ebm", Second: "Fdim", Third: "Gb", Fourth: "Abm", Fifth: "Bbm", Sixth: "B", Seventh: "Db"},
    {KeyName: "Em", Root: "Em", Second: "F#dim", Third: "G", Fourth: "Am", Fifth: "Bm", Sixth: "C", Seventh: "D"},
    {KeyName: "Fm", Root: "Fm", Second: "Gdim", Third: "Ab",  Fourth: "Bbm", Fifth: "Cm", Sixth: "Db", Seventh: "Eb"},

];

const ordinalMap = {
    1: "Root",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth",
    7: "Seventh"
};

const progressions =  [
    {
        id: 0,
        name:"Only One",
        chordSymbols:["I", "I", "I", "I"],
        ordinals: ["Root", "Root", "Root", "Root"],
        chordIds: [0, 0, 0, 0]
    },
    {
        id: 1,
        name:"Twelve Bar Blues",
        chordSymbols:["I", "I", "I", "I", "IV", "IV", "I", "I","V", "IV", "I", "V"],
        ordinals: ["Root", "Root", "Root", "Root", "Fourth"], //TODO
        chordIds: [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 5 ]
    }
];

const grooveTypes = [
  "something funky",
  "a swung sixteenth note hip hop groove",
  "a slow dragging hip hop groove",
  "a bossa nova groove",
  "something with a latin feel",
  "a party dance groove",
  "a shuffle",
  "a funky shuffle",
  "a real slow R and B type groove.",
  "a swinging soul groove",
  "any groove of the drummers choice",
  "a swinging blues",
  "a jazz shuffle",
  "some funky jazzy hip hop shit",
  "whatever the hell kinda beat you fools want",
  "a slow soft rock beat",
  "something in any time signature of the drummers choice",
];

const bonusChallenges = [
    "Have at least two band members trade instruments",
    "Execute a key change on a designated band members signal",
    "Try going to a reggae bridge on the four chord, even if it completely doesnt belong.",
    "Everyone take turns trading fours with the drummer",
    "Pay extra attention to dynamics.",
    "Have a few band members contribute ad libbed back up vocals",
    "Try switching to a different time signature of the drummers choosing mid-jam",
    "Only 50% of the band members can play at a time. You may round up to the nearest whole band member. Tag in and out, but don't drop the groove.",
    "Everybody has to play an instrument they haven't played today",
    "Everytime the drummer hits a tom everybody has to yell whoooooop",
    "Multiple members of the band must sing improvised backup harmonies",
    "No one can play any chords. Plan an arrangement so that each instrument is only playing one note at a time to make the chords.",
    "Play a chord progression forwards and then play the same chords in reverse order",
    "Everybody has to drink a beer during the song.",
    "As your jamming, call out the influences that your drawing upon in your improvisations",
    "Talk about some interesting chord voicings to use before you start",
    "Make sure your song  has at least three different parts. For example, verses, choruses, and a bridge.",
    "Talk about an interesting intro and/or outro for what your playing.",
    "Play as quietly as you possibly can",
    "Write down the chord progressions you used and a few ideas for lyrical content",
    "Have a reflective discussion after the jam about what worked best",
    "Everyone gets to turns taking a shreddy avaunt garde solos while all other instruments play exremely conservatively",
    "Write lyrics about 90's TV characaters, or Pizza, or something really sad.",
    "Write out specific parts for some or all instruments after you mess with the chords for a few minutes.",
    "Try throwing in some stops and hits",
    "Play a game of Red Light, Greenlight, led by the drummer. When they drum, you play, when they stop you cut. If you fuck up your out.",
];

let repertoire = [
    {
        name: "Cissy Strut",
        artist: "The Meters",
        key: "G"
    },
    {
        name: "Beastly",
        artist: "Vulfpeck",
        key: "D"
    },
    {
        name: "Chameleon",
        artist: "Herbie Hancock",
        key: "B flat"
    }
];

let wishList = [
    {
        name: "Soul Intro / The Chicken",
        artist: "Jaco",
        key: "B flat"
    },
    {
        name: "Hedron",
        artist: "Badbadnotgood",
        key: "B flat"
    },
    {
        name: "Fall in Love",
        artist: "J Dilla",
        key: "D minor"
    },
];

const notes = [
  {
    id: 1,
    name: 'A'
  },
  {
    id: 2,
    name: 'Bb'
  },
  {
    id: 3,
    name: 'B'
  },
  {
    id: 4,
    name: 'C'
  },
  {
    id: 5,
    name: 'C#'
  },
  {
    id: 6,
    name: 'Db'
  },
  {
    id: 7,
    name: 'D'
  },
  {
    id: 8,
    name: 'D#'
  },
  {
    id: 9,
    name: 'Eb'
  },
  {
    id: 10,
    name: 'E'
  },
  {
    id: 11,
    name: 'F'
  },
  {
    id: 12,
    name: 'F#'
  },
  {
    id: 13,
    name: 'Gb'
  },
  {
    id: 12,
    name: 'G'
  },
  {
    id: 12,
    name: 'G#'
  },
  {
    id: 12,
    name: 'Ab'
  },
];
