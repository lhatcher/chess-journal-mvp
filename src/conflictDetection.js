

// returns true if a conflict is found
var hasConflicts = function(fromFile, toFile, fromRank, toRank, fileDiff, rankDiff, piece, color) {
  var files = ['a','b','c','d','e','f','g','h'];

  if ( piece === 'R' ) {
    if (fromFile === toFile) {
      return hasAVerticalConflict();
    }
  }
};

var hasAVerticalConflict = function() {

};

var hasAHorizontalConflict = function() {

};

var hasADiagonalConflict = function() {

};









// if ( piece === 'P' && !board.isEmpty(tofile, toRank) ) {
//
// }
