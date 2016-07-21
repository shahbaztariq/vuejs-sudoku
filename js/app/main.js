define([
    'vue',
    'jquery',
    'app/cache',
    'app/boards',
    'app/components/menu',
    'app/components/cell'
], function (Vue, $, cache, boards, menu, cell) {
    return new Vue({
        
        /**
         * root el id
         */
        'el' : '#app',
        
        /**
         * data
         */
        'data' : {
            'cells' : [],
            'won'   : false
        },
        
        /**
         * components
         */
        'components' : {
            'my-menu' : menu,
            'my-cell' : cell
        },
        
        /**
         * on ready
         *
         * @return {this}
         */
        'ready' : function () {
            this.start();
        },
        
        /**
         * computed properties
         */
        'computed' : {
            'class' : function () {
                var c = [];
                
                if (this.won) {
                    c.push('won');
                }
                
                return c.join(' ');
            },
        },
        
        /**
         * methods
         */
        'methods' : {
            
            /**
             * start
             *
             * @param  {string} difficulty
             *
             * @return {this}
             */
            'start' : function (difficulty) {
                
                var board;
                
                switch (difficulty) {
                    case 'easy':
                        board = boards.easy();
                    break;
                    case 'medium':
                        board = boards.medium();
                    break;
                    case 'hard':
                        board = boards.hard();
                    break;
                    default:
                        board = boards.any();
                }
                
                var cells = [];
                
                for (var i = 0; i < 81; i++) {
                    cells.push({
                        'number'   : parseInt(board[i]),
                        'guess'    : parseInt(board[i]),
                        'position' : i + 1,
                        'row'      : Math.ceil((i + 1) / 9),
                        'col'      : (i % 9) + 1,
                        'conflict' : false,
                        'section'  : ''
                    });
                }
                
                this.cells = cells;
                
                return this;
            },
            
            /**
             * congratulate
             *
             * @return {this}
             */
            'congratulate' : function () {
                
                this.won = true;
                
                
                return this;
            },
            
            /**
             * reset game
             *
             * @return {this}
             */
            'reset' : function () {
                cache.clear();
                this.won = false;
                
                return this;
            },
            
            /**
             * get row cells
             *
             * @param  {int} row
             *
             * @return {array}
             */
            'getRow' : function (row) {
                
                var key = 'row_' + row.toString();
                
                if (cache.has(key)) {
                    return cache.get(key);
                }
                
                var cells = [];
                
                $.each(this.cells, function (index, cell) {
                    if (cell.row == row) {
                        cells.push(cell);
                    }
                });
                
                cache.set(key, cells);
                
                return cells;
            },
            
            /**
             * get column cells
             *
             * @param  {int} col
             *
             * @return {array}
             */
            'getCol' : function (col) {
                
                var key = 'col_' + col.toString();
                
                if (cache.has(key)) {
                    return cache.get(key);
                }
                
                var cells = [];
                
                $.each(this.cells, function (index, cell) {
                    if (cell.col == col) {
                        cells.push(cell);
                    }
                });
                
                cache.set(key, cells);
                
                return cells;
            },
            
            /**
             * get cell
             *
             * @param  {int} row
             * @param  {int} col
             *
             * @return {Object}
             */
            'getCell' : function (row, col) {
                
                var key = 'row_' + row.toString() + 'col_' + col.toString();
                
                if (cache.has(key)) {
                    return cache.get(key);
                }
                
                var found = false;
                
                $.each(this.cells, function (index, cell) {
                    if (cell.col == col && cell.row == row) {
                        found = cell;
                        return false;
                    }
                });
                
                cache.set(key, found);
                
                return found;
            },
            
            /**
             * get section keys
             *
             * @return {array}
             */
            'getSectionKeys' : function () {
                return ['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br'];
            },
            
            /**
             * get section matrix
             *
             * @return {Object}
             */
            'getSectionMatrix' : function () {
                return {
                    'tl' : [[1,1], [1,2], [1,3],    [2,1], [2,2], [2,3],    [3,1], [3,2], [3,3]],
                    'tc' : [[1,4], [1,5], [1,6],    [2,4], [2,5], [2,6],    [3,4], [3,5], [3,6]],
                    'tr' : [[1,7], [1,8], [1,9],    [2,7], [2,8], [2,9],    [3,7], [3,8], [3,9]],
                    
                    'cl' : [[4,1], [4,2], [4,3],    [5,1], [5,2], [5,3],    [6,1], [6,2], [6,3]],
                    'cc' : [[4,4], [4,5], [4,6],    [5,4], [5,5], [5,6],    [6,4], [6,5], [6,6]],
                    'cr' : [[4,7], [4,8], [4,9],    [5,7], [5,8], [5,9],    [6,7], [6,8], [6,9]],
                    
                    'bl' : [[7,1], [7,2], [7,3],    [8,1], [8,2], [8,3],    [9,1], [9,2], [9,3]],
                    'bc' : [[7,4], [7,5], [7,6],    [8,4], [8,5], [8,6],    [9,4], [9,5], [9,6]],
                    'br' : [[7,7], [7,8], [7,9],    [8,7], [8,8], [8,9],    [9,7], [9,8], [9,9]],
                }
            },
            
            /**
             * get section (9 x 9 square)
             *
             * @param  {string} section
             *
             * @return {array}
             */
            'getSection' : function (section) {
                
                var key = 'section_' + section.toString();
                
                if (cache.has(key)) {
                    return cache.get(key);
                }
                
                var cells = [];
                
                var sections = this.getSectionMatrix();
                
                if (typeof sections[section] != 'undefined') {
                    $.each(sections[section], function (index, coord) {
                        var cell = this.getCell(coord[0], coord[1]);
                        if (cell) {
                            cell.section = section;
                            cells.push(cell);
                        }
                    }.bind(this));
                }
                
                cache.set(key, cells)
                
                return cells;
            },
            
            /**
             * validate
             *
             * @return {this}
             */
            'validate' : function () {
                this.clearConflicts();
                this.validateRows();
                this.validateColumns();
                this.validateSections();
                return this;
            },
            
            /**
             * has won
             *
             * @return {bool}
             */
            'hasWon' : function () {
                
                if (this.hasConflicts()) {
                    return false;
                }
                
                for (var i = 1; i <= 9; i++) {
                    if (! this.isCellsHaveValidSum(this.getRow(i))) {
                        return false;
                    }
                    
                    if (! this.isCellsHaveValidSum(this.getCol(i)) ) {
                        return false;
                    }
                }
                
                var foundInvalidSectionSum = false;
                
                $.each(this.getSectionKeys(), function(index, key) {
                    if (! this.isCellsHaveValidSum(this.getSection(key))) {
                        foundInvalidSectionSum = true;
                        return false;
                    }
                }.bind(this));
                
                if (foundInvalidSectionSum) {
                    return false;
                }
                
                return true;
            },
            
            'isCellsHaveValidSum' : function (cells) {
                var sum = 0;
                
                $.each(cells, function(index, cell) {
                    sum += cell.guess;
                });
                
                return sum == 45;
            },
            
            /**
             * clear conflicts
             *
             * @return {this}
             */
            'clearConflicts' : function () {
                $.each(this.cells, function (index, cell) {
                    cell.conflict = false
                });
                
                return this;
            },
            
            /**
             * get conflicted cells
             *
             * @return {array}
             */
            'getConflictedCells' : function () {
                var cells = [];
                
                $.each(this.cells, function (index, cell) {
                    if (cell.conflict) {
                        cells.push(cell);
                    }
                });
                
                return cells;
            },
            
            /**
             * has conflicted cells
             *
             * @return {int}
             */
            'hasConflicts' : function () {
                return this.getConflictedCells().length;
            },
            
            /**
             * validate rows
             *
             * @return {this}
             */
            'validateRows' : function () {
                for (var i = 1; i <= 9; i++) {
                    this.validateCells(this.getRow(i));
                }
                
                return this;
            },
            
            /**
             * validate columns
             *
             * @return {this}
             */
            'validateColumns' : function () {
                for (var i = 1; i <= 9; i++) {
                    this.validateCells(this.getCol(i));
                }
                
                return this;
            },
            
            /**
             * validate sections
             *
             * @return {this}
             */
            'validateSections' : function () {
                
                $.each(this.getSectionKeys(), function(index, section){
                    this.validateCells(this.getSection(section));
                }.bind(this));
                
                return this;
            },
            
            /**
             * validate cells
             *
             * @param  {array} cells
             *
             * @return {this}
             */
            'validateCells' : function (cells) {
                var _cells = {};
                
                $.each(cells, function (index, cell) {
                    
                    var key = 'key_' + cell.guess.toString();
                    
                    if (cell.guess !== 0 && typeof _cells[key] != 'undefined') {
                        this.setConflictedCouple(cell, _cells[key]);
                    }
                    
                    _cells[key] = cell;
                    
                }.bind(this));
                
                return this;
            },
            
            /**
             * set conflicted cell couple
             *
             * @param  {Object} cellA
             * @param  {Object} cellB
             *
             * @return {this}
             */
            'setConflictedCouple' : function (cellA, cellB) {
                cellA.conflict = true;
                cellB.conflict = true;
                
                if (cellA.row == cellB.row) {
                    this.setConflictedRow(cellA.row);
                }
                
                if (cellA.col == cellB.col) {
                    this.setConflictedCol(cellA.col);
                }
                
                if (cellA.section == cellB.section) {
                    this.setConflictedSection(cellA.section);
                }
                
                return this;
            },
            
            /**
             * set conflicted row
             *
             * @param  {int} row
             *
             * @return {this}
             */
            'setConflictedRow' : function (row) {
                return this.setConflicted(this.getRow(row));
            },
            
            /**
             * set conflicted column
             *
             * @param  {int} col
             *
             * @return {this}
             */
            'setConflictedCol' : function (col) {
                return this.setConflicted(this.getCol(col));
            },
            
            /**
             * set conflicted section
             *
             * @param  {string} section
             *
             * @return {this}
             */
            'setConflictedSection' : function (section) {
                return this.setConflicted(this.getSection(section));
            },
            
            /**
             * set conflicted
             *
             * @param  {array} cells
             *
             * @return {this}
             */
            'setConflicted' : function (cells) {
                $.each(cells, function (index, cell) {
                    cell.conflict = true;
                });
                
                return this;
            },
            
            /**
             * solve
             *
             * @param  {int} r
             * @param  {int} c
             *
             * @return {[type]} [description]
             */
            'solve' : function (r, c) {
                
                var row = r || 0;
                var col = c || 0;
                
                var cell = this.getNextEmptyCell(row, col);
                
                if (cell === false) {
                    return true;
                }
                
                var values = this.getPossibleValuesForCell(cell);
                
                var solved = false;
                
                if (values.length) {
                    $.each(values, function (index, value) {
                        
                        cell.number = value;
                        cell.guess = value;
                        
                        this.validate();
                        
                        if (! this.hasConflicts()) {
                            if (this.solve(row, col)) {
                                solved = true;
                                return false;
                            }
                        }
                        
                        cell.number = 0;
                        cell.guess = 0;
                        
                    }.bind(this));
                }
                
                return solved;
            },
            
            /**
             * get next empty cell
             *
             * @return {object}
             */
            'getNextEmptyCell' : function (row, col) {
                
                var emptyCell = this.getCell(row, col);
                
                if (emptyCell !== false && emptyCell.guess === 0) {
                    return emptyCell;
                }
                
                $.each(this.cells, function (index, cell) {
                    if (cell.guess == 0) {
                        emptyCell = cell;
                        return false;
                    }
                });
                
                return emptyCell;
            },
            
            /**
             * get poss numbers for cell
             *
             * @param  {object} cell
             *
             * @return {array}
             */
            'getPossibleValuesForCell' : function (cell) {
                var possNumbers = [];
                var usedNumbers = '';
                
                var f = function (index, cell) {
                    if (usedNumbers.indexOf(cell.guess.toString()) === -1) {
                        usedNumbers += cell.guess.toString();
                    }
                };
                
                $.each(this.getRow(cell.row), f);
                $.each(this.getCol(cell.col), f);
                $.each(this.getSection(cell.section), f);
                
                for (var i = 1; i <= 9; ++i) {
                    if (usedNumbers.indexOf(i.toString()) === -1) {
                        possNumbers.push(i);
                    }
                }
                
                return possNumbers;
            },
        },
        
        'events' : {
            'guess' : function (number, coord) {
                this.getCell(coord[0], coord[1]).guess = parseInt(number);
                this.validate();
                
                if (this.hasWon()) {
                    this.congratulate();
                }
            },
            
            'start_easy' : function () {
                this.reset();
                this.start('easy');
            },
            
            'start_medium' : function () {
                this.reset();
                this.start('medium');
            },
            
            'start_hard' : function () {
                this.reset();
                this.start('hard');
            },
            
            'start_any' : function () {
                this.reset();
                this.start('any');
            },
            
            'solve' : function () {
                if (this.solve() && this.hasWon()) {
                    this.congratulate();
                } else {
                    alert('It seem\'s that this puzzle cannot be solved? Well, at least I tried.');
                }
            },
        },
    });
});
