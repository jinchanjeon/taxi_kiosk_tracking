// store.js 파일
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: null,
        lat: null,
        lng: null
    }, // 초기값은 임의로 설정

    mutations: {
        savename(state, name) {
            state.name = name;
        },
        savelat(state, lat) {
            state.lat = lat;
        },
        savelng(state, lng) {
            state.lng = lng;
        }
    }
});
