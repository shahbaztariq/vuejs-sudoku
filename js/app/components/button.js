define(['vue'], function (Vue) {
    
    var template = '' + 
        '<button class="button" :class="class">' +
            '{{ text }}' +
        '</button>';
    
    return Vue.extend({
        
        'template' : template,
        
        'props' : {
            'text' : {
                'type' : String,
                'required' : true
            }
        },
        
        'data' : function () {
            return {
                'class' : {
                    'active' : true
                }
            };
        }
    });
});
