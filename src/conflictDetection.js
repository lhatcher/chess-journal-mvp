// returns true if a conflict of any type is found for a specific piece
var hasConflicts = function(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color) { // Does this function signature actually use all these variables???
  var files = ['a','b','c','d','e','f','g','h'];

  if ( piece === 'R' ) {
    if ( fileDiff === 0 ) {
      return hasAVerticalConflict(fromFile, fromRank, toRank);
    } else if ( rankDiff === 0) {
      // debugger;
      console.log(hasAHorizontalConflict(fromRank, fromFile, toFile));
      return hasAHorizontalConflict(fromRank, fromFile, toFile);
    }
  } else if ( piece === 'B' ) {
    if ( !hasADiagonalConflict(fromFile, fromRank, toFile, toRank) ) {
      if ( !board.isEmpty(toFile, toRank) ) {
        if ( !colorsMatch(color, toFile, toRank) ) {
          $('#' + toFile + toRank).empty();
        } else {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  } else if ( piece === 'Q' ) {
    if ( fileDiff === 0 ) {
      // if ( !hasAVerticalConflict(fromFile, fromRank, toRank) ) {
      //   if ( !colorsMatch(color, toFile, toRank) ) {
      //     $('#' + toFile + toRank).empty();
      //     return false;
      //   }
      // }
      // return true;
      return hasAVerticalConflict(fromFile, fromRank, toRank);
    } else if ( rankDiff === 0 ) {
      // if ( !hasAHorizontalConflict(fromRank, fromFile, toFile) ) {
      //   console.log('123456');
      //   if ( !board.isEmpty(toFile, toRank) ) {
      //     if ( !colorsMatch(color, toFile, toRank) ) {
      //       $('#' + toFile + toRank).empty();
      //       return true;
      //     }
      //   }
      //   return false;
      // } else {
      //   return true;
      // }
      return hasAHorizontalConflict(fromRank, fromFile, toFile);
    } else {
      return hasADiagonalConflict(fromFile, fromRank, toFile, toRank);
    }
  }
};

var hasAVerticalConflict = function(file, fromRank, toRank) {
  // determine iteration direction
  if (fromRank < toRank) {
    for ( var i = fromRank; i < toRank-1; i++ ) { // TODO remove comment or change toRank-1 back to just toRank
      if (board[file][i] !== 0) {
        return true;
      }
    }
  } else {
    for ( var i = fromRank-1; i > toRank; i-- ) {
      if (board[file][i-1] !== 0) {
        return true;
      }
    }
  }
  return false;
};

var hasAHorizontalConflict = function(rank, fromFile, toFile) {
  var fromIndex = board.files.indexOf(fromFile);
  var toIndex = board.files.indexOf(toFile);
  if (Math.abs(fromIndex - toIndex) === 1) {
    return false;
  }

  //determine iteration direction
  if (fromIndex < toIndex) {
    for ( var i = fromIndex; i < toIndex-1; i++ ) {
      console.log(board[board.files[i+1]][rank]);
      if (board[board.files[i+1]][rank-1] !== 0) {
        return true;
      }
    }
  } else {
    for ( var i = fromIndex; i > toIndex+1; i-- ) {
      if (board[board.files[i-1]][rank-1]) {
        return true;
      }
    }
  }
  return false;
};

var hasADiagonalConflict = function(fromFile, fromRank, toFile, toRank) {
  var verticalDirection = fromRank < toRank ? 'up' : 'down';
  var horizontalDirection = fromFile < toFile ? 'right' : 'left';
  var fileIndex = board.files.indexOf(fromFile);

  if (verticalDirection === 'up') {
    for ( var i = fromRank; i < toRank; i++ ) {
      if (board[board.files[fileIndex]][i-1] !== 0 && i !== fromRank) {
        return true;
      }
      fileIndex = horizontalDirection === 'right' ? fileIndex + 1 : fileIndex - 1;
    }
  } else {
    for ( var i = fromRank; i > toRank; i-- ) {
      if (board[board.files[fileIndex]][i-1] !== 0 && i !== fromRank) {
        return true;
      }
      fileIndex = horizontalDirection === 'right' ? fileIndex + 1 : fileIndex - 1;
    }
  }
};

var colorsMatch = function(color, toFile, toRank) {
  var opposingColor;
  if (document.getElementById(toFile+toRank).innerHTML.indexOf('white') !== -1) {
    opposingColor = 'white';
  } else if (document.getElementById(toFile+toRank).innerHTML.indexOf('black') !== -1) {
    opposingColor = 'black';
  }
  if (color === undefined || opposingColor === undefined) {
    // throw 'Unspecified Color Error: expected undefined to be black or white';
  } else {
    return color === opposingColor;
  }
}
