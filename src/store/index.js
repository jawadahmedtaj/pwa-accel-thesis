import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    easy: {

    },
    medium: {

    },
    hard: {

    },
    participant: "",
  },
  mutations: {
    setParticipant(state, data) {
      state.participant = data;
    }
  },
  actions: {},
  modules: {}
});
