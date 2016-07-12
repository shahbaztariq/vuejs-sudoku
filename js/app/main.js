define(['vue', 'app/menu'], function (Vue, Menu) {
    return new Vue({
        
        'el' : '#app',
        
        'data' : {
            'active' : false,
            'time' : null
        },
        
        'components' : {
            'my-menu' : Menu
        },
        
        'methods' : {
            'start' : function () {
                this.active = true;
                console.log('start');
            },
            
            'stop' : function () {
                this.active = false;
                console.log('stop');
            },
            
            'reset' : function () {
                this.active = false;
                console.log('reset');
            },
        }
    });
});
