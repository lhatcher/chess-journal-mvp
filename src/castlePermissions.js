var CastlePermissions = function(color) {
  this.color = color;
  this.hasBeenInCheck = false;
  this.kingHasNotMoved = true;
  this.fileARookHasNotMoved = true;
  this.fileHRookHasNotMoved = true;
};

CastlePermissions.prototype.rankIsClear = function(toFile) {
  if (this.color === 'white') {
    if (toFile === 'g') {
      return (board.isEmpty('f' ,1) && board.isEmpty('f' ,1));
    } else if (toFile === 'c') {
      return ( board.isEmpty('b', 1) && board.isEmpty('c', 1) && board.isEmpty('d', 1) );
    }
  } else {
    if (toFile === 'g') {
      return (board.isEmpty('f' ,8) && board.isEmpty('f' ,8));
    } else if (toFile === 'c') {
      return ( board.isEmpty('b', 8) && board.isEmpty('c', 8) && board.isEmpty('d', 8) );
    }
  }
};

CastlePermissions.prototype.canCastle = function(toFile){
  if (toFile === 'g') {
    return this.kingHasNotMoved && this.fileHRookHasNotMoved && this.rankIsClear(toFile);
  } else if (toFile === 'c') {
    return this.kingHasNotMoved && this.fileARookHasNotMoved && this.rankIsClear(toFile);
  }
};

var wCastle = new CastlePermissions('white');
var bCastle = new CastlePermissions('black');

var isValidCastleMove = function (color, toFile, fileDiff) {
  var files = ['a','b','c','d','e','f','g','h'];

  //castle move is executed by king attempting to move 2 spaces
  if ( fileDiff === 2 ) {
    if (color === 'white') {
      if ( wCastle.canCastle(toFile) ) {

        return true;
      }
    } else {
      if ( bCastle.canCastle(toFile) ) {
        
        return true;
      }
    }
  } else {
    return false;
  }
};
