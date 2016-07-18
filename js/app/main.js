define([
    'vue',
    'jquery',
    'app/vuex/store',
    'app/components/menu',
    'app/components/cell'
], function (vue, $, store, menu, cell) {
    return new vue({
        
        'el' : '#app',

        'store' : store,
        
        'data' : {
            'cells' : []
        },
        
        'components' : {
            'my-menu' : menu,
            'my-cell' : cell
        },

        'ready' : function () {
            
            var board = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
            var cells = [];
            
            for (var i = 0; i < 81; i++) {
                cells.push({
                    'number'   : parseInt(board[i]),
                    'guess'    : '',
                    'position' : i + 1,
                    'row'      : Math.ceil((i + 1) / 9),
                    'col'      : (i % 9) + 1,
                    'conflict' : false,
                    'section'  : ''
                });
            }
            
            this.cells = cells;
            
            /*
            this.$store.watch(function (store) {
                return store.active;
            }, function () {
                console.log('sd');
            });
            */
        },
        
        'methods' : {
            'getRow' : function (row) {
                var cells = [];
                
                $.each(this.cells, function (index, cell) {
                    if (cell.row == row) {
                        cells.push(cell);
                    }
                });
                
                return cells;
            },
            
            'getCol' : function (col) {
                var cells = [];
                
                $.each(this.cells, function (index, cell) {
                    if (cell.col == col) {
                        cells.push(cell);
                    }
                });
                
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
                var found = false;
                
                $.each(this.cells, function (index, cell) {
                    if (cell.col == col && cell.row == row) {
                        found = cell;
                        return false;
                    }
                });
                
                return found;
            },
            
            /**
             * get section (9 x 9 square)
             *
             * @param  {string} section
             *
             * @return {array}
             */
            'getSection' : function (section) {
                var cells = [];
                
                var sections = {
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
                
                if (typeof sections[section] != 'undefined') {
                    $.each(sections[section], function (index, coord) {
                        var cell = this.getCell(coord[0], coord[1]);
                        if (cell) {
                            cells.push(cell);
                        }
                    }.bind(this));
                }
                
                return cells;
            },
            
            'getConflictedCells' : function () {
                var cells = [];
                
                $.each(this.cells, function (index, cell) {
                    if (cell.conflict) {
                        cells.push(cell);
                    }
                });
                
                return cells;
            },
            
            'clearConflicts' : function () {
                $.each(this.cells, function (index, cell) {
                    cell.conflict = false
                });
            },
            
            'validate' : function () {
                this.clearConflicts();
                this.validateRows();
                this.validateColumns();
                this.validateSections();
                this.highlight();
            },
            
            'validateRows' : function () {
                for (var i = 1; i <= 9; i++) {
                    this.validateCells(this.getRow(i));
                }
            },
            
            'validateColumns' : function () {
                for (var i = 1; i <= 9; i++) {
                    this.validateCells(this.getCol(i));
                }
            },
            
            'validateSections' : function () {
                var sections = ['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br'];
                
                $.each(sections, function(index, section){
                    this.validateCells(this.getSection(section));
                }.bind(this));
            },
            
            'validateCells' : function (cells) {
                var _cells = {};
                
                $.each(cells, function (index, cell) {
                    
                    var key = 'key_' + cell.number.toString();
                    
                    if (cell.number !== 0 && typeof _cells[key] != 'undefined') {
                        cell.conflict = true
                        _cells[key].conflict = true;
                    }
                    
                    _cells[key] = cell;
                    
                }.bind(this));
            },
            
            'highlight' : function () {
                
                this.each(this.getConflictedCells(), function (index, cell) {
                    
                    var row = this.getRow(cell.row);
                    var col = this.getCol(cell.col);
                    
                }.bind(this));
                
            },
        },
        
        'events' : {
            'guess' : function (number, coord) {
                this.getCell(coord[0], coord[1]).number = parseInt(number);
                this.validate();
            }
        },
    });
});
