define([
    'vue',
    'app/vuex/store',
    'app/components/menu'
], function (vue, store, menu) {
    return new vue({
        
        'el' : '#app',

        'store' : store,
        
        'data' : {},
        
        'components' : {
            'my-menu' : menu
        },

        'ready' : function () {
            this.$store.watch(function (store) {
                return store.active;
            }, function () {
                console.log('sd');
            });
        }
    });
});
