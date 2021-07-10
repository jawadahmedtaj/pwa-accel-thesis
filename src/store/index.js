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
    counter: 0,
    numbers: ["mdi-circle-slice-6", "mdi-circle-slice-7", "mdi-circle-slice-6 mdi-flip-h", "mdi-circle-slice-7 mdi-flip-h"],
    characters: ["mdi-gamepad-down", "mdi-gamepad-up", "mdi-gamepad-left", "mdi-gamepad-right"],
    patterns: [
      "mdi-record-circle",
      "mdi-record-circle-outline",
      "mdi-stop-circle",
      "mdi-stop-circle-outline",
    ],
    arrows: ["mdi-hexagon-slice-1", "mdi-hexagon-slice-2", "mdi-hexagon-slice-1 mdi-flip-h", "mdi-hexagon-slice-2 mdi-flip-h"],
    easyPattern: [],
    mediumPattern: [],
    hardPattern: [],
  },
  mutations: {
    setParticipant(state, name) {
      state.participant = name;
    },
    setDifficulty(state, difficulty) {
      state.[difficulty] = true;
    },
    countSetter(state, count) {
      state.counter = count;
    },
    easySetter(state, data) {
      state.easy.push(...data);
    },
    mediumSetter(state, data) {
      state.medium.push(...data);
    },
    hardSetter(state, data) {
      state.hard.push(...data);
    },
    easyPatternSetter(state, data) {
      state.easyPattern = data;
    },
    mediumPatternSetter(state, data) {
      state.mediumPattern = data;
    },
    hardPatternSetter(state, data) {
      state.hardPattern = data;
    }
  },
  actions: {},
  modules: {}
});
