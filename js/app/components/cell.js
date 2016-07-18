define(['vue'], function (Vue) {
    
    var template = '' + 
        '<li class="cell" :class="class">' +
            '<input v-model="guess" v-on:keyup.stop.prevent="try">' +
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
            'number' : function () {
                return this.cell.number;
            },
            'class' : function () {
                return {
                    'editable' : (this.cell.number == 0),
                    'conflict' : this.cell.conflict
                };
            },
            'coords' : function () {
                return [this.cell.row, this.cell.col];
            },
        },
        
        'methods' : {
            'try' : function () {
                this.$dispatch('guess', this.guess, this.coords);
            }
        }
    });
});
