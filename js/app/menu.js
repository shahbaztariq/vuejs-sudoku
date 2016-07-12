define(['vue', 'app/main/button'], function (Vue, Button) {
    
    var template = '' + 
        '<div class="menu" :class="class">' +
            '<my-button text="Start" v-on:click="start" v-if="! active"></my-button>' +
            '<my-button text="Stop" v-on:click="stop" v-if="active"></my-button>' +
            '<my-button text="Reset" v-on:click="reset" v-if="active"></my-button>' +
        '</div>';
    
    return Vue.extend({
        
        'template' : template,
        
        'props' : {
            'active' : {
                'type' : Boolean,
                'required' : true
            }
        },
        
        'data' : function () {
            return {
                'class' : {
                    'active' : true
                }
            };
        },
        
        'components' : {
            'my-button' : Button
        },
        
        'methods' : {
            
            'start' : function () {
                this.$emit('start');
            },
            
            
            'stop' : function () {
                this.$emit('stop');
            },
            
            
            'reset' : function () {
                this.$emit('reset');
            },
            
        },
    });
});
