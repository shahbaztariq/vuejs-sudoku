define([
    'vue'
], function (Vue) {
    
    var template = '' + 
        '<button class="pure-button pure-button-primary">' +
            '{{ text }}' +
        '</button>';
    
    return Vue.extend({
        
        /**
         * template
         */
        'template' : template,
        
        /**
         * props
         */
        'props' : {
            'text' : {
                'type' : String,
                'required' : true
            }
        }
    });
});
