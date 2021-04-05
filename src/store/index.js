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
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    characters: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    patterns: [
      "mdi-record-circle",
      "mdi-record-circle-outline",
      "mdi-stop-circle",
      "mdi-stop-circle-outline",
    ],
    arrows: [
      "mdi-arrow-down-bold",
      "mdi-arrow-left-bold",
      "mdi-arrow-right-bold",
      "mdi-arrow-up-bold",
    ],
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
