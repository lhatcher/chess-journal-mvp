// TODO
// En passant
// Castling
// Check
// Check mate
// Implement conflict checker
// fix pieces attacking own color

$(document).ready(function(){
  init();

  var clicked = [];

  $('.square').on('click', function() {
    clicked.push($(this).attr('id'));
    $(this).addClass('clicked');
    // console.log($(this).children[0]);
    if (clicked.length === 2) {
      movePiece(clicked[0], clicked[1]);
      $('#'+clicked[0]).removeClass('clicked');
      $(this).removeClass('clicked');
      clicked = [];
    }
  });

});

var moveLog = [];

var board = {
  // white --------- black
  a: ['R','P',0,0,0,0,'P','R'],
  b: ['Kn','P',0,0,0,0,'P','Kn'],
  c: ['B','P',0,0,0,0,'P','B'],
  d: ['Q','P',0,0,0,0,'P','Q'],
  e: ['K','P',0,0,0,0,'P','K'],
  f: ['B','P',0,0,0,0,'P','B'],
  g: ['Kn','P',0,0,0,0,'P','Kn'],
  h: ['R','P',0,0,0,0,'P','R'],

  movePiece: function(piece, file, rank, originFile, originRank) {
    this[file][rank-1] = piece;
    this[originFile][originRank-1] = 0;
  },

  isEmpty: function(file, rank){
    return this[file][rank-1] === 0;
  },
};

var init = function() {
  populateBoard();
};

var populateBoard = function() {
  //pawns
  var files = ['a','b','c','d','e','f','g','h'];
  for (var i = 0; i < files.length; i++) {
    $('#' + files[i] + 7).append('<p class="black">P</p>');
    $('#' + files[i] + 2).append('<p class="white">P</p>');
  }

  //rooks
  $('#' + files[0] + 8).append('<p class="black">R</p>');
  $('#' + files[7] + 8).append('<p class="black">R</p>');
  $('#' + files[0] + 1).append('<p class="white">R</p>');
  $('#' + files[7] + 1).append('<p class="white">R</p>');

  //knights
  $('#' + files[1] + 8).append('<p class="black">Kn</p>');
  $('#' + files[6] + 8).append('<p class="black">Kn</p>');
  $('#' + files[1] + 1).append('<p class="white">Kn</p>');
  $('#' + files[6] + 1).append('<p class="white">Kn</p>');

  // bishops
  $('#' + files[2] + 8).append('<p class="black">B</p>');
  $('#' + files[5] + 8).append('<p class="black">B</p>');
  $('#' + files[2] + 1).append('<p class="white">B</p>');
  $('#' + files[5] + 1).append('<p class="white">B</p>');

  // Queen
  $('#' + files[3] + 8).append('<p class="black">Q</p>');
  $('#' + files[3] + 1).append('<p class="white">Q</p>');

  // Queen
  $('#' + files[4] + 8).append('<p class="black">K</p>');
  $('#' + files[4] + 1).append('<p class="white">K</p>');
};

var movePiece = function(fromSquare, toSquare) {
  var color = document.getElementById(fromSquare);
  if ( color.innerHTML.indexOf('white') !== -1 ) {
    color = 'white';
  } else {
    color = 'black';
  }

  var piece = document.getElementById(fromSquare).innerText;
  piece = piece.replace(/(\r\n|\n|\r)/gm,"");
  if ( isValidMove(fromSquare, toSquare, piece, color) ) {
    var temp = document.getElementById(fromSquare).innerHTML.toString();
    $('#' + fromSquare).children().fadeOut(500, function() {
      $(this).empty();
    });
    $('#' + toSquare).append(temp).hide().fadeIn(500);
    board.movePiece(piece, toSquare[0], toSquare[1], fromSquare[0], fromSquare[1]);
    moveLog.push({move: moveLog.length + 1, from: fromSquare, to: toSquare, color: color});
  }
};

var isValidMove = function(fromSquare, toSquare, piece, color) {
  if(fromSquare === toSquare) {
    return false;
  }
  var files = ['a','b','c','d','e','f','g','h'];
  var fromFile = fromSquare[0];
  var toFile = toSquare[0];
  var fromRank = fromSquare[1];
  var toRank = toSquare[1];
  var fileDiff = Math.abs( files.indexOf(fromFile) - files.indexOf(toFile) );
  var rankDiff = Math.abs( fromRank - toRank );

  // Invalid inputs, not a1 through h8
  if ( files.indexOf(fromSquare[0]) === -1 || files.indexOf(toSquare[0]) === -1 ){
    alert('invalid');
    return false;
  }

  if ( piece === 'P' ) {
    if ( !(fromRank === '2' || fromRank === '7') && (rankDiff > 1) ) {
      return false;
    }
    if (color === 'black') {
      if ( (rankDiff === 1) && (fileDiff === 1) && (fromRank - toRank > 0) ) {
        return isAttacking(piece, color, toSquare);
      }
      if ( fromRank - toRank < 0 ) {
        return false;
      }
      return !( (fromFile !== toFile) || (Math.abs(toRank - fromRank) > 2) );
    }
    if ( fromRank - toRank > 0 ) {
      return false;
    }
    if ( rankDiff === 1 && fileDiff === 1) {
      return isAttacking(piece, color, toSquare);
    }
    return !( (fromFile !== toFile) || (toRank - fromRank > 2) );
  }

  if ( piece === 'Kn' ) {
    isAttacking(piece, color, toSquare);
    return ( ((fileDiff === 2 && rankDiff === 1) || (fileDiff === 1 && rankDiff === 2)) );
  }
  if ( piece === 'B' ) {
    isAttacking(piece, color, toSquare);
    return fileDiff === rankDiff;
  }
  if ( piece === 'Q') {
    isAttacking(piece, color, toSquare);
    return ( (fromRank === toRank) || (fromFile === toFile) || (fileDiff === rankDiff) );
  }
  if ( piece === 'K' ) {
    isAttacking(piece, color, toSquare);
    if (rankDiff <= 1 && fileDiff <= 1) {
      if (color === 'white') {
        wCastle.kingHasNotMoved = false;
      } else {
        bCastle.kingHasNotMoved = false;
      }
      return true;
    } else {
      return isValidCastleMove(color, toFile, fileDiff);
    }
  }
  if ( piece === 'R' ) {
    isAttacking(piece, color, toSquare);
    if (fileDiff === 0 || rankDiff === 0) {
      if (color === 'white') {
        if(fromFile === 'a') {
          wCastle.fileARookHasNotMoved = false;
        } else {
          wCastle.fileHRookHasNotMoved = false;
        }
      } else {
        if(fromFile === 'a') {
          bCastle.fileARookHasNotMoved = false;
        } else {
          bCastle.fileHRookHasNotMoved = false;
        }
      }
      return true;
    }
  }
};

// returns true if a conflict is found
var hasConflicts = function(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color) {
  var files = ['a','b','c','d','e','f','g','h'];

  if ( piece === 'P' && !board.isEmpty(tofile, toRank) ) {

  }

};

var isAttacking = function(piece, color, toSquare, returnValue) {
  var occupiedColor;
  if ( (document.getElementById(toSquare).innerHTML.indexOf('white') !== -1) ) {
    occupiedColor = 'white';
  } else if ( ((document.getElementById(toSquare).innerHTML.indexOf('black') !== -1)) ) {
    occupiedColor = 'black';
  }
  if ( color === occupiedColor || !occupiedColor ) {
    return false;
  }
  if ( !returnValue ) {
    $('#' + toSquare).animate(500, function() {
      $(this).html('');
    });
  }
  return true;
};






















//
