define([
    'vue',
    'app/components/button'
], function (vue, button) {

    var template = '' + 
        '<ul class="menu" :class="class">' +
            '<li><my-button text="Easy"   v-on:click="easy"  ></my-button></li>' +
            '<li><my-button text="Medium" v-on:click="medium"></my-button></li>' +
            '<li><my-button text="Hard"   v-on:click="hard"  ></my-button></li>' +
            '<li><my-button text="Any"    v-on:click="any"   ></my-button></li>' +
        '</ul>';
    
    return vue.extend({
        
        'template' : template,
        
        'components' : {
            'my-button' : button
        },
        
        'methods' : {
            /**
             * easy
             *
             * @return {void}
             */
            'easy' : function () {
                this.$dispatch('start_easy');
            },
            
            /**
             * medium
             *
             * @return {void}
             */
            'medium' : function () {
                this.$dispatch('start_medium');
            },
            
            /**
             * hard
             *
             * @return {void}
             */
            'hard' : function () {
                this.$dispatch('start_hard');
            },
            
            /**
             * any
             *
             * @return {void}
             */
            'any' : function () {
                this.$dispatch('start_any');
            },
        }
    });
});
