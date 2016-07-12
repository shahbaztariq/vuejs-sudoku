define(['vue', 'vuex'], function (Vue, Vuex) {
    Vue.use(Vuex);

    return new Vuex.Store({
        'state' : {
            'active' : false,
            'time' : 0
        },

        'mutations' : {
            'START' : function (state) {
                state.active = true;
            },

            'STOP' : function (state) {
                state.active = false;
            },

            'RESET' : function (state) {
                state.active = false;
            }
        },

        'actions' : {
            'start' : function (store) {
                store.commit('START');
            },
            'stop' : function (store) {
                store.commit('STOP');
            },
            'reset' : function (store) {
                store.commit('RESET');
            }
        },

        'getters' : {
            'active' : function (state) {
                return state.active;
            }
        }
    });
});
