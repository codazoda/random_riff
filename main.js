// Config
var totalNotes = 11;

// Some variables
var picks = [];
var previousPick;
var mainScale;

// Use the pentatonic scale
mainScale = pentatonic();

// Setup some events
$('#refreshIcon').click(showPicks);
$('#key').change(showPicks);

showPicks();

/**
 * Setup and return the pentatonic scale string/fret values.
 */
function pentatonic() {
  var pent = [
    '-----0',
    '-----3',
    '----0-',
    '----2-',
    '---0--',
    '---2--',
    '--0---',
    '--2---',
    '-0----',
    '-3----',
    '0-----',
    '3-----'
  ];
  return pent;
}

// Show the picks
function showPicks() {
    
    var transScale = [];
    
    // Pick the first note
    picks[0] = pickFirst(totalNotes);
    previousPick = picks[0];
    
    // Pick the next 7 notes
    for(i=0;i<=7;i++) {
      picks[i] = pickNext(totalNotes, previousPick);
      previousPick = picks[i];
    }
    
    // Transcribe the scale
    transScale = transcribe(mainScale, parseInt($('#key').val()));
    
    // Show the picks
    jtab.render( $('#jtab'), getJTab(picks, transScale) );
    
}

/**
 * Return the ASCII tab for the specified set of picked notes
 * using the specified scale.
 */
function getJTab(picks, scale) {
  var tab = '';
  var fret = '';
  var string = 0;
  // Loop through the note picks
  for(p=0;p<=picks.length-1;p++) {
    // Loop through the six strings
    for(s=0;s<6;s++) {
      //console.log('String ' + s + '; Pick ' + p + '; Note ' + picks[p] + '; Tab ' + scale[picks[p]]);
      //console.log('Fret ' + scale[picks[p]].substring(s,s+1));
      fret = scale[picks[p]].substring(s,s+1);
      string = s + 1;
      if (fret != '-') {
        tab = tab + '$' + string + ' ' + fret + ' ';
      }
    }
  }
  return tab;
}

/**
 * Return the jTab for the specified set of picked notes
 * using the specified scale.
 */
function getTab(picks, scale) {
  var tab = '';
  // Loop through the six strings
  for(s=0;s<6;s++) {
    // Loop through the note picks
    for(p=0;p<=picks.length-1;p++) {
      tab = tab + scale[picks[p]].substring(s,s+1);
    }
    tab = tab + "\n";
  }
  return tab;
}

function transcribe(scale, addFrets) {
    var newScale = [];
    var fret = 0;
    // Loop through the scale notes
    for(n=0;n<=scale.length-1;n++) {
        newScale[n] = '';
        // Loop through the strings
        for(s=0;s<6;s++) {
            fret = scale[n].substring(s,s+1);
            // If it not a hyphen
            if (fret != '-') {
                fret = parseInt(fret) + addFrets;
            }
            newScale[n] = newScale[n] + fret.toString();
        }
    }
    return newScale;
}

/**
 * Pick a random number between 0 and totalNotes
 */
function pickFirst(totalNotes) {
  var note;
  note = Math.floor(Math.random()*totalNotes+1);
  return note;
}

/**
 * Using the last note, pick the next note within 2 hops.
 */
function pickNext(totalNotes, previousPick) {
  var move;
  var newPick;
  // Between -2 and 2
  move = Math.floor(Math.random()*4)-2;
  newPick = previousPick + move;
  // If it's too low or two high, pick again
  if (newPick < 0 || newPick > totalNotes) {
    newPick = pickNext(totalNotes, previousPick);
  }
  return newPick;
}