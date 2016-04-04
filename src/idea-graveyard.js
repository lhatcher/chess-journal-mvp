var hasConflicts = function(fromSquare, toSquare, piece, color) {
  var files = ['a','b','c','d','e','f','g','h'];
  var fromFile = fromSquare[0];
  var toFile = toSquare[0];
  var fromRank = fromSquare[1];
  var toRank = toSquare[1];
  var fileDiff = Math.abs( files.indexOf(fromFile) - files.indexOf(toFile) );
  var rankDiff = Math.abs( fromRank - toRank );


  // if (piece === 'P') {
  //   if ( !board.isEmpty(toFile,toRank) ) {
  //     return true;
  //   } else if (fileDiff === 1) {
  //     isAttacking();
  //   }
  // }


  // // if there is a piece on toSquare
  // // console.log(board[fromFile][fromSquare]);
  // if (board[fromFile][fromSquare] > 0) {
  //   isAttacking();
  //   return true;
  // }
  // return false;
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
  // console.log(hasConflicts(fromSquare, toSquare, piece, color));
  if (isValidMove(fromSquare, toSquare, piece, color) && !hasConflicts(fromSquare, toSquare, piece, color)) {
    var temp = document.getElementById(fromSquare).innerHTML.toString();
    $('#' + toSquare).append(temp);
    $('#' + fromSquare).empty();
    board.movePiece(piece,toSquare[0],toSquare[1], fromSquare[0], fromSquare[1]);
  }
};