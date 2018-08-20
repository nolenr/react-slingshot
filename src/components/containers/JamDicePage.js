import React from 'react';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/fuelSavingsActions';
import DiceRollArea from '../DiceRollArea';

export class JamDicePage extends React.Component {
  
  constructor(props) {
    super (props);
    this.state = {
      grooveClasses: [],
      grooveDescription: '',
      grooveIsLocked: false,
      keyClasses: [],
      keyDescription: '',
      keyIsLocked: false,
      bonusClasses: [],
      bonusDescription: '',
      bonusIsLocked: false,
    }
    this.rollAllHandler = this.rollAllDice.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
  }

  clearHandler() {
    console.log("state being cleared");
    this.setState({
      grooveClasses: [],
      grooveDescription: null,
      keyClasses: [],
      keyDescription: null,
      bonusClasses: [],
      bonusDescription: null,
    });
    console.log(this.state);
  }

  rollAllDice() {
    console.log(this.state);
    
    this.setState({
      grooveClasses: ['rolled'],
      grooveDescription: getRandomGroove(),
      keyClasses: ['rolled'],
      bonusDescription: getRandomBonus(),
      bonusClasses: ['rolled'],
      keyDescription: getChordsList(),
    });
    
  }

  render() {
    return (
      <div>
        <div className="play-area">
          <DiceRollArea 
            title="groove"  
            description={this.state.grooveDescription} 
            rollFn={this.rollGroove} 
            dieClasses={this.state.grooveClasses} />

          <DiceRollArea 
            title="chords" 
            description={this.state.keyDescription} 
            rollFn={this.rollGroove} 
            dieClasses={this.state.keyClasses} />

          <DiceRollArea 
            title="bonus" 
            description={this.state.bonusDescription}
            rollFn={this.rollGroove} 
            dieClasses={this.state.bonusClasses} />

          <div className="roll-button button-frame">
            <button onClick={this.rollAllHandler}><h3>Roll the Dice!</h3></button>
          </div>

          <div className="roll-button button-frame">
            <button className="roll-button" onClick={this.clearHandler}><h3>Clear</h3></button>
          </div>
        </div>
      </div>
    );
  }
}

JamDicePage.propTypes = {

};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JamDicePage);

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

const musicDataOld = [
  {KeyName: "A. major",        Root: "A. major",      Second: "Bm",       Third: "C# minor",  Fourth: "D major",        Fifth: "E major",            Sixth: "F sharp minor",  Seventh: "G sharp diminished" },
  {KeyName: "Bb major",   Root: "B flat major", Second: "C minor",       Third: "D minor",        Fourth: "E flat major",   Fifth: "F major",            Sixth: "G minor",        Seventh: "A. diminished" },
  {KeyName: "B major",        Root: "B major",      Second: "C sharp minor", Third: "D sharp minor",  Fourth: "E major",        Fifth: "F sharp major",      Sixth: "G sharp minor",  Seventh: "A. sharp diminished" },
  {KeyName: "C major",        Root: "C major",      Second: "D minor",       Third: "E minor",        Fourth: "F major",        Fifth: "G major",            Sixth: "A. minor",        Seventh: "B diminished" },
  {KeyName: "D flat major",   Root: "D flat major", Second: "E flat minor",  Third: "F minor",        Fourth: "G flat major",   Fifth: "A. flat major",       Sixth: "B flat minor",   Seventh: "C diminished" },
  {KeyName: "D major",        Root: "D major",      Second: "E minor",       Third: "F sharp minor",  Fourth: "G major",        Fifth: "A. major",            Sixth: "B minor",        Seventh: "C sharp diminished" },
  {KeyName: "E flat major",   Root: "E flat major", Second: "F minor",       Third: "G minor",        Fourth: "A. flat major",   Fifth: "B flat major",       Sixth: "C minor",        Seventh: "D diminished" },
  {KeyName: "E major",        Root: "E major",      Second: "F sharp minor", Third: "G sharp minor",  Fourth: "A. major",        Fifth: "B major",            Sixth: "C sharp minor",  Seventh: "D sharp diminished" },
  {KeyName: "F major",        Root: "F major",      Second: "G minor",       Third: "A. minor",        Fourth: "B flat major",   Fifth: "C major",            Sixth: "D minor",        Seventh: "E diminished" },
  {KeyName: "G flat major",   Root: "G flat major", Second: "A. flat minor",  Third: "B flat minor",   Fourth: "B major",        Fifth: "D flat major",       Sixth: "E flat minor",   Seventh: "F diminished" },
  {KeyName: "G major",        Root: "G major",      Second: "A. minor",       Third: "B minor",        Fourth: "C major",        Fifth: "D major",            Sixth: "E minor",        Seventh: "F sharp diminished" },
  {KeyName: "A. flat major",   Root: "A. flat major", Second: "B flat minor",  Third: "C minor",        Fourth: "D flat major",   Fifth: "E flat major",       Sixth: "F minor",        Seventh: "G diminished" },
  
  {KeyName: "F sharp minor",  Root: "F sharp minor",Second: "G sharp diminished", Third: "A. major",       Fourth: "B minor",        Fifth: "C sharp minor",      Sixth: "D major",        Seventh: "E major"},
  {KeyName: "G minor",        Root: "G minor",      Second: "A. diminished",       Third: "B flat major",  Fourth: "C minor",        Fifth: "D minor",            Sixth: "E flat major",   Seventh: "F major"},
  {KeyName: "G sharp minor",  Root: "G sharp minor",Second: "A. sharp diminished", Third: "B major",       Fourth: "C sharp minor",  Fifth: "D sharp minor",      Sixth: "E major",        Seventh: "F sharp major"},
  {KeyName: "A. minor",        Root: "A. minor",      Second: "B diminished",       Third: "C major",       Fourth: "D minor",        Fifth: "E minor",            Sixth: "F major",        Seventh: "G major"},
  {KeyName: "B flat minor",   Root: "B flat minor", Second: "C diminished",       Third: "D flat major",  Fourth: "E flat minor",   Fifth: "F minor",            Sixth: "G flat major",   Seventh: "A. flat major"},
  {KeyName: "B minor",        Root: "B minor",      Second: "C sharp diminished", Third: "D major",       Fourth: "E minor",        Fifth: "F sharp minor",      Sixth: "G major",        Seventh: "A. major"},
  {KeyName: "C minor",        Root: "C minor",      Second: "D diminished",       Third: "E flat major",  Fourth: "F minor",        Fifth: "G minor",            Sixth: "A. flat major",   Seventh: "B flat major"},
  {KeyName: "C sharp minor",  Root: "C sharp minor",Second: "D sharp diminished", Third: "E major",       Fourth: "F sharp minor",  Fifth: "G sharp minor",      Sixth: "A. major",        Seventh: "B major"},
  {KeyName: "D minor",        Root: "D minor",      Second: "E diminished",       Third: "F major",       Fourth: "G minor",        Fifth: "A. minor",            Sixth: "B flat major",   Seventh: "C major"},
  {KeyName: "E flat minor",   Root: "E flat minor", Second: "F diminished",       Third: "G flat major",  Fourth: "A. flat minor",   Fifth: "B flat minor",       Sixth: "B major",        Seventh: "D flat major"},
  {KeyName: "E minor",        Root: "E minor",      Second: "F sharp diminished", Third: "G major",       Fourth: "A. minor",        Fifth: "B minor",            Sixth: "C major",        Seventh: "D major"},
  {KeyName: "F minor",        Root: "F minor",      Second: "G diminished",       Third: "A. flat major",  Fourth: "B flat minor",   Fifth: "C minor",            Sixth: "D flat major",   Seventh: "E flat major"},

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
