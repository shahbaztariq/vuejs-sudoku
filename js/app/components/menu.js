define([
    'vue',
    'app/components/button'
], function (vue, button, actions, getters) {

    var template = '' + 
        '<div class="menu" :class="class">' +
            '<my-button text="Start" v-on:click="start" v-if="! active"></my-button>' +
            '<my-button text="Stop" v-on:click="stop" v-if="active"></my-button>' +
            '<my-button text="Reset" v-on:click="reset" v-if="active"></my-button>' +
        '</div>';
    
    return vue.extend({
        
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
            'my-button' : button
        },

        'computed' : {
            'active' : function () {
                return this.$store.getters.active;
            }
        },

        'methods' : {
            'start' : function () {
                this.$store.dispatch('start');
            },

            'stop' : function () {
                this.$store.dispatch('stop');
            },

            'reset' : function () {
                this.$store.dispatch('reset');
            }
        }
    });
});
