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

  files: ['a','b','c','d','e','f','g','h'],

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
    // console.log('value is: ', this[file][rank-1]);
    return this[file][rank-1] === 0;
  },
};

var init = function() {
  populateBoard();
};

var populateBoard = function() {
  //pawns
  // var files = ['a','b','c','d','e','f','g','h'];
  for (var i = 0; i < board.files.length; i++) {
    $('#' + board.files[i] + 7).append('<p class="black">P</p>');
    $('#' + board.files[i] + 2).append('<p class="white">P</p>');
  }

  //rooks
  $('#' + board.files[0] + 8).append('<p class="black">R</p>');
  $('#' + board.files[7] + 8).append('<p class="black">R</p>');
  $('#' + board.files[0] + 1).append('<p class="white">R</p>');
  $('#' + board.files[7] + 1).append('<p class="white">R</p>');

  //knights
  $('#' + board.files[1] + 8).append('<p class="black">Kn</p>');
  $('#' + board.files[6] + 8).append('<p class="black">Kn</p>');
  $('#' + board.files[1] + 1).append('<p class="white">Kn</p>');
  $('#' + board.files[6] + 1).append('<p class="white">Kn</p>');

  // bishops
  $('#' + board.files[2] + 8).append('<p class="black">B</p>');
  $('#' + board.files[5] + 8).append('<p class="black">B</p>');
  $('#' + board.files[2] + 1).append('<p class="white">B</p>');
  $('#' + board.files[5] + 1).append('<p class="white">B</p>');

  // Queens
  $('#' + board.files[3] + 8).append('<p class="black">Q</p>');
  $('#' + board.files[3] + 1).append('<p class="white">Q</p>');

  // Kings
  $('#' + board.files[4] + 8).append('<p class="black">K</p>');
  $('#' + board.files[4] + 1).append('<p class="white">K</p>');
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
    $('#' + fromSquare).empty();
    moveLog.push({move: moveLog.length + 1, from: fromSquare, to: toSquare, color: color});
  }
};





//
