<template>
  <v-container class="fullDisplay" fluid>
    <div class="my-3">
      <h4>Select the appropriate option</h4>
    </div>
    <div>
      <h5>{{ textShow }}</h5>
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
        class="buttonAdjuster"
        color="grey"
        @click.prevent="optionClicked(character)"
        :disabled="selected"
        >{{ character }}</v-btn
      >
      <v-btn
        class="buttonAdjuster"
        :color="color"
        @click.prevent="optionClicked(character)"
        :disabled="selected"
      ></v-btn>
      <v-btn
        class=""
        color="grey"
        @click.prevent="optionClicked(character)"
        :disabled="selected"
      >
        <v-icon>{{ arrow }}</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Hard",
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
      colors: [
        "brown",
        "pink",
        "red",
        "black",
        "purple",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "green",
        "yellow",
      ],
      color: "grey",
      arrows: [
        "mdi-arrow-down-bold",
        "mdi-arrow-left-bold",
        "mdi-arrow-right-bold",
        "mdi-arrow-up-bold",
      ],
      arrow: undefined,
      number: undefined,
      character: undefined,
      selected: false,
      correctAnswer: undefined,
      trialCount: 0,
      isStopped: true,
      textShow: "",
      holder: [],
      baseline: true,
    };
  },
  beforeCreate() {
    window.addEventListener("devicemotion", (event) => {
      this.sensor = `${
        Math.round((event.acceleration.x + Number.EPSILON) * 100) / 100
      }, ${Math.round((event.acceleration.y + Number.EPSILON) * 100) / 100}, ${
        Math.round((event.acceleration.z + Number.EPSILON) * 100) / 100
      }`;
      const sensorTemp = this.sensor;
      const dateTemp = new Date().getTime();
      const baseline = this.baseline;
      this.holder.push({
        sensorValue: sensorTemp,
        time: dateTemp,
        correct: undefined,
        selected: undefined,
        baseline: baseline,
      });
    });
  },
  mounted() {
    this.questionChanger();
    setInterval(this.questionChanger, 3000);
  },
  methods: {
    questionChanger() {
      if (this.isStopped) {
        if (this.trialCount % 2 === 0) {
          this.selected = true;
          this.number = undefined;
          this.character = undefined;
          this.color = "grey";
          this.arrow = undefined;
          this.baseline = true;
          this.textShow = `Baseline`;
        } else {
          this.baseline = false;
          this.selected = false;
          this.number = this.numbers[
            Math.floor(Math.random() * this.numbers.length)
          ];
          this.character = this.characters[
            Math.floor(Math.random() * this.characters.length)
          ];
          this.color = this.colors[
            Math.floor(Math.random() * this.colors.length)
          ];
          this.arrow = this.arrows[
            Math.floor(Math.random() * this.arrows.length)
          ];
          const tempArray = [
            this.number,
            this.character,
            this.color,
            this.arrow,
          ];
          this.correctAnswer =
            tempArray[Math.floor(Math.random() * tempArray.length)];
          if (this.colors.indexOf(this.correctAnswer) > -1)
            this.textShow = `Please select: ${this.correctAnswer} colored box`;
          else if (this.arrows.indexOf(this.correctAnswer) > -1)
            this.textShow = `Please select: ${this.correctAnswer} colored box`;
          else this.textShow = `Please select: ${this.correctAnswer}`;
        }
        if (this.trialCount > 18) {
          this.isStopped = false;
          this.$router.push({
            name: "Resting",
            params: { difficulty: "Hard" },
          });
        }
        this.trialCount++;
        console.log("Count: ", this.trialCount);
        console.log("isSopped: ", this.isStopped);
      }
    },
    optionClicked(e) {
      this.selected = true;
      const sensorTemp = this.sensor;
      const dateTemp = new Date().getTime();
      const correct = this.correctAnswer == e;
      const selected = e;
      const baseline = this.baseline;
      this.holder.push({
        sensorValue: sensorTemp,
        time: dateTemp,
        correct: correct,
        selected: selected,
        baseline: baseline,
      });
      console.log(this.correctAnswer == e);
    },
  },
  beforeDestroy() {
    clearInterval(this.questionChanger);
    this.$store.commit("hardSetter", this.holder);
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