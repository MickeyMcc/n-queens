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
  var foundSolution = false;
  
  var makeColumnObj = function(n) {
    obj = [];
    for (i = 0; i < n; i++) {
      obj[i] = true;
    }
    return obj;
  };
  

  const addAPiece = (board, row, emptyCols) => {
    for (var col in emptyCols) {
      if (foundSolution) {
        break;
      }
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        if (row !== n - 1) {
          delete emptyCols[col];
          addAPiece(board, row + 1, emptyCols);
          if (!foundSolution) {
            board.togglePiece(row, col);
            emptyCols[col] = true;
          }
        } else {
          solution = board.rows();
          foundSolution = true;
          break;
        }
      } else {
        board.togglePiece(row, col);
      }
    }
    return;   
  };
  
  addAPiece(board, 0, makeColumnObj(n));

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.length === 0 ? (new Board({n: n})).rows() : solution;
};
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = n => {

  let solutionCount = 0;
  const board = new Board({n: n});
  
  const makeColumnObj = n => {
    obj = [];
    for (i = 0; i < n; i++) {
      obj[i] = true;
    }
    return obj;
  };

  const addAPiece = (board, row, emptyCols) => {
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
  
  addAPiece(board, 0, makeColumnObj(n));

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return n === 0 ? 1 : solutionCount;
};

window.countNQueensSolutions = function(n) {
  if (n === 1 || n === 0) {
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  }
  
  let solutionCount = 0;
  const board = new Board({n: n});
  
  const makeColumnObj = n => {
    obj = [];
    for (i = 0; i < n; i++) {
      obj[i] = true;
    }
    return obj;
  };

  var addAPiece = (board, row, emptyCols) => {
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
  
  addAPiece(board, 0, makeColumnObj(n));
  //compareCopies()

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
