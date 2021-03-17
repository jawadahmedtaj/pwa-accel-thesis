<template>
  <v-container class="fullDisplay" fluid>
    <div class="my-3">
      <h4>Select the appropriate option</h4>
    </div>
    <div>
      <h5>Please select: {{ correctAnswer }}</h5>
    </div>
    <div>
      <v-btn
        class="buttonAdjuster"
        color="grey"
        @click.prevent="optionClicked(number)"
        :disabled="selected"
        >{{ number }}</v-btn
      >
      <v-btn
        class=""
        color="grey"
        @click.prevent="optionClicked(character)"
        :disabled="selected"
        >{{ character }}</v-btn
      >
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Easy",
  data() {
    return {
      sensor: "",
      count: 0,
      countEnabled: true,
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
      number: undefined,
      character: undefined,
      selected: false,
      correctAnswer: undefined,
    };
  },
  components: {},
  beforeCreate() {
    window.addEventListener("devicemotion", (event) => {
      console.log(event);
      this.sensor += `x: ${
        Math.round((event.acceleration.x + Number.EPSILON) * 100) / 100
      } m/s2, y: ${
        Math.round((event.acceleration.y + Number.EPSILON) * 100) / 100
      } m/s2, z: ${
        Math.round((event.acceleration.z + Number.EPSILON) * 100) / 100
      } m/s2`;

      // console.log("Timestamp: ", new Date().getTime());

      // if (this.countEnabled) this.count += 1;

      // setTimeout(() => {
      //   this.countEnabled = false;
      // }, 1000);
    });
  },
  mounted() {
    setInterval(this.questionChanger, 3000);
  },
  methods: {
    questionChanger() {
      this.selected = false;
      this.number = this.numbers[
        Math.floor(Math.random() * this.numbers.length)
      ];
      this.character = this.characters[
        Math.floor(Math.random() * this.characters.length)
      ];
      const tempArray = [this.number, this.character];
      this.correctAnswer =
        tempArray[Math.floor(Math.random() * tempArray.length)];
    },
    optionClicked(e) {
      this.selected = true;
      console.log(this.correctAnswer == e);
    },
  },
};
</script>

<style lang="sass" scoped>
.fullDisplay
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.buttonAdjuster
  margin-right: 15px
</style>