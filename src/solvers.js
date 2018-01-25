/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  var solution = board.rows();

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function (n) {
    var solutions = 1;
    while (n > 0) {
      solutions *= n;
      n--;
    }
    return solutions;
  };
  
  solutionCount = factorial(n);
  //is solution count just length of potential boards????
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});
  var potentialBoards = [];
  potentialBoards.push(board);
  
  var makeDeepCopy = function(currentBoard) {
    var currentBoardArr = currentBoard.rows();
    var cBoardString = JSON.stringify(currentBoardArr);
    var newBoardArr = JSON.parse(cBoardString);
    var newBoard = new Board(newBoardArr);
    return newBoard;
  };
  
  var tryAllRowOptions = function (potentialBoards) {
    var newBoards = [];
    for (var boardNum = 0; boardNum < potentialBoards.length; boardNum++) {
      var currentBoard = potentialBoards[boardNum];
      for (var c = 0; c < n; c++) {
        currentBoard.togglePiece(row, c);
        if (!currentBoard.hasAnyQueensConflicts()) {
          var newBoard = makeDeepCopy(currentBoard);
          newBoards.push(newBoard);
          currentBoard.togglePiece(row, c);
        } else {
          currentBoard.togglePiece(row, c);
        }
      }
    }
    return newBoards;
  };
  
  for (var row = 0; row < n; row ++) {
    potentialBoards = tryAllRowOptions(potentialBoards);
  }
  if (potentialBoards[0]) {
    solution = potentialBoards[0].rows();
  } else {
    solution = board.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 1) {
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  }
  
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var potentialBoards = [];
  potentialBoards.push(board);
  
  var makeDeepCopy = function(currentBoard) {
    var currentBoardArr = currentBoard.rows();
    var cBoardString = JSON.stringify(currentBoardArr);
    var newBoardArr = JSON.parse(cBoardString);
    var newBoard = new Board(newBoardArr);
    return newBoard;
  };
  
  
  var tryAllRowOptions = function (potentialBoards) {
    var newBoards = [];
    for (var currentBoard of potentialBoards) {
      for (var col = 0; col < n; col++) {
        currentBoard.togglePiece(row, col);
        if (!currentBoard.hasAnyQueensConflicts()) {
          var newBoard = makeDeepCopy(currentBoard);
          newBoards.push(newBoard);
          currentBoard.togglePiece(row, col);
        } else {
          currentBoard.togglePiece(row, col);
        }
      }
    }
    return newBoards;
  };
  
  for (var row = 0; row < n; row ++) {
    potentialBoards = tryAllRowOptions(potentialBoards);
  }
  
  //for (var boardNum = 0; boardNum < potentialBoards.length; boardNum++) {
  
  solutionCount = potentialBoards.length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
