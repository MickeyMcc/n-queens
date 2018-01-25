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
  
  var solution = []; //fixme
  var board = new Board({n: n});
  
  var makeColumnObj = function(n) {
    obj = [];
    for (i = 0; i < n; i++) {
      obj[i] = true;
    }
    return obj;
  };
  
  var allColumns = makeColumnObj(n);
  
  var makeCopy = function(currentBoard) {
    return currentBoard.rows().map(function (row) {
      return row.slice();
    });
  };

  var addAPiece = function (board, row, emptyCols) {
    for (var col in emptyCols) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        if (row !== n - 1) {
          delete emptyCols[col];
          addAPiece(new Board(makeCopy(board)), row + 1, emptyCols);
          board.togglePiece(row, col);
          emptyCols[col] = true;
        } else {
          solution = board.rows();
          return;
        }
      } else {
        board.togglePiece(row, col);
      }
    }
    return;   
  };
  
  if (solution.length === 0) {
    solution = (new Board({n:n})).rows();
  }
  
  addAPiece(board, 0, allColumns);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  if (n === 1 || n === 0) {
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  }
  
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  
  var makeColumnObj = function(n) {
    obj = [];
    for (i = 0; i < n; i++) {
      obj[i] = true;
    }
    return obj;
  };
  
  var allColumns = makeColumnObj(n);
  
  var makeCopy = function(currentBoard) {
    return currentBoard.rows().map(function (row) {
      return row.slice();
    });
  };

  var addAPiece = function (board, row, emptyCols) {
    for (var col in emptyCols) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        if (row !== n - 1) {
          delete emptyCols[col];
          addAPiece(board, row + 1, emptyCols);
          board.togglePiece(row, col);
          emptyCols[col] = true;
        } else {
          board.togglePiece(row, col);
          solutionCount++;
          return;
        }
      } else {
        board.togglePiece(row, col);
      }
    }
    return;   
  };
  
  addAPiece(board, 0, allColumns);
  //compareCopies()

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
