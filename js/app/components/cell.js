define(['vue'], function (Vue) {
    
    var template = '' + 
        '<li class="cell" :class="class">' +
            '<input v-model="guess" v-on:keyup.stop.prevent="try" maxlength="1">' +
            '<span>{{cell.number}}</span>' +
        '</li>';
    
    return Vue.extend({
        
        'template' : template,
        
        'props' : {
            'cell' : {
                'type' : Object
            }
        },
        
        'data' : function () {
            return {
                'guess' : ''
            };
        },
        
        'computed' : {
            
            /**
             * number
             *
             * @return {int}
             */
            'number' : function () {
                return this.cell.number;
            },
            
            /**
             * class
             *
             * @return {string}
             */
            'class' : function () {
                
                var c = [];
                
                if (this.cell.number == 0) {
                    c.push('editable');
                }
                
                if (this.cell.conflict) {
                    c.push('conflict');
                }
                
                var rowClass = 'row-' + this.cell.row.toString();
                var colClass = 'col-' + this.cell.col.toString();
                
                c.push(rowClass);
                c.push(colClass);
                
                return c;
            },
            
            /**
             * coords
             *
             * @return {array}
             */
            'coords' : function () {
                return [this.cell.row, this.cell.col];
            },
        },
        
        'methods' : {
            
            /**
             * try
             *
             * @return {this}
             */
            'try' : function () {
                this.$dispatch('guess', this.guess, this.coords);
                
                return this
            }
        }
    });
});
