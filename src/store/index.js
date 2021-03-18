import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    easy: [],
    medium: [],
    hard: [],
    participant: "",
    easyDone: false,
    mediumDone: false,
    hardDone: false,
    counter: 0
  },
  mutations: {
    setParticipant(state, name) {
      state.participant = name;
    },
    setDifficulty(state, difficulty) {
      state.[difficulty] = true;
    },
    countSetter(state, count) {
      state.counter = count
    },
    easySetter(state, data) {
      state.easy.push(data)
    },
    mediumSetter(state, data) {
      state.medium.push(data)
    },
    hardSetter(state, data) {
      state.hard.push(data)
    },
  },
  actions: {},
  modules: {}
});
