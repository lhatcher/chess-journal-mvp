

// returns true if a conflict is found
var hasConflicts = function(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color) {
  var files = ['a','b','c','d','e','f','g','h'];

  if ( piece === 'R' ) {
    if ( fileDiff === 0 ) {
      return hasAVerticalConflict(fromFile, fromRank, toRank);
    } else if ( rankDiff === 0) {
      return hasAHorizontalConflict(fromRank, fromFile, toFile);
    }
  } else if ( piece === 'B' ) {

  }
};

var hasAVerticalConflict = function(file, fromRank, toRank) {

  // determine which direction to iterate
  if (fromRank < toRank) {
    for ( var i = fromRank; i < toRank; i++ ) {
      if (board[file][i] !== 0) {
        return true;
      }
    }
  } else {
    for ( var i = fromRank-1; i >= toRank; i-- ) {
      if (board[file][i-1] !== 0) {
        return true;
      }
    }
  }
  return false;
};

var hasAHorizontalConflict = function(rank, fromFile, toFile) {

};

var hasADiagonalConflict = function() {

};









// if ( piece === 'P' && !board.isEmpty(tofile, toRank) ) {
//
// }
