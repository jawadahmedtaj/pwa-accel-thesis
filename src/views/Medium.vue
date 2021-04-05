<template>
  <v-container class="fullDisplay" fluid>
    <div>
      <h5>{{ textShow }}</h5>
    </div>
    <div>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>{{ number }}</v-btn>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>{{
        character
      }}</v-btn>
    </div>
    <div>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>
        <v-icon>{{ pattern }}</v-icon>
      </v-btn>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>
        <v-icon></v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn
        class="buttonAdjuster"
        color="primary"
        @click.prevent="optionClicked"
        :disabled="selected"
        >Yes</v-btn
      >
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Medium",
  data() {
    return {
      sensor: "",
      count: 0,
      countEnabled: true,
      numbers: this.$store.state.numbers,
      characters: this.$store.state.characters,
      patterns: this.$store.state.patterns,
      number: undefined,
      character: undefined,
      pattern: undefined,
      selected: false,
      correctAnswer: undefined,
      trialCount: 0,
      isStopped: true,
      textShow: "",
      holder: [],
      baseline: true,
      mediumPattern: this.$store.state.mediumPattern,
    };
  },
  beforeCreate() {
    window.addEventListener("devicemotion", (event) => {
      this.sensor = `${
        Math.round((event.acceleration.x + Number.EPSILON) * 100) / 100
      }, ${Math.round((event.acceleration.y + Number.EPSILON) * 100) / 100}, ${
        Math.round((event.acceleration.z + Number.EPSILON) * 100) / 100
      }`;
      this.holder.push({
        sensorValue: this.sensor,
        time: new Date().getTime(),
        baseline: this.baseline,
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
          this.pattern = undefined;
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
          this.pattern = this.patterns[
            Math.floor(Math.random() * this.patterns.length)
          ];
          this.textShow = "Is this the correct pattern?";
        }
        if (this.trialCount > 18) {
          this.isStopped = false;
          this.$router.push({
            name: "Resting",
            params: { difficulty: "Medium" },
          });
        }
        this.trialCount++;
        console.log("Count: ", this.trialCount);
        console.log("isSopped: ", this.isStopped);
      }
    },
    optionClicked() {
      this.selected = true;
      const correct =
        this.mediumPattern[0] == this.number &&
        this.mediumPattern[1] == this.character &&
        this.mediumPattern[2] == this.pattern;
      if (correct) {
        this.$toast.open({
          message: "Correct Answer!",
          type: "success",
          position: "top",
          duration: 1000,
        });
      } else {
        this.$toast.open({
          message: "Incorrect Answer!",
          type: "error",
          position: "top",
          duration: 1000,
        });
      }
      this.holder.push({
        sensorValue: this.sensor,
        time: new Date().getTime(),
        correct: correct,
        baseline: this.baseline,
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.questionChanger);
    this.$store.commit("mediumSetter", this.holder);
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
  margin: 25px
</style>