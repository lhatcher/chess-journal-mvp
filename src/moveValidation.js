var isValidMove = function(fromSquare, toSquare, piece, color) {
  if(fromSquare === toSquare) {
    return false;
  }
  // var files = ['a','b','c','d','e','f','g','h'];
  var fromFile = fromSquare[0];
  var toFile = toSquare[0];
  var fromRank = fromSquare[1];
  var toRank = toSquare[1];
  var fileDiff = Math.abs( board.files.indexOf(fromFile) - board.files.indexOf(toFile) );
  var rankDiff = Math.abs( fromRank - toRank );

  // Invalid inputs, not a1 through h8
  if ( board.files.indexOf(fromSquare[0]) === -1 || board.files.indexOf(toSquare[0]) === -1 ){
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
    if (fileDiff === rankDiff) {
      return !hasConflicts(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color);
    }
  }
  if ( piece === 'Q') {
    isAttacking(piece, color, toSquare);
    return ( ((fromRank === toRank) || (fromFile === toFile) || (fileDiff === rankDiff)) && !hasConflicts(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color) );
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
      return !hasConflicts(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color);
    }
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
