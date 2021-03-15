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
    easyDone: false,
    mediumDone: false,
    hardDeone: false
  },
  mutations: {
    setParticipant(state, name) {
      state.participant = name;
    },
    setDifficulty(state, difficulty) {
      state.[difficulty] = true;
    }
  },
  actions: {},
  modules: {}
});
