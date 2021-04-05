<template>
  <v-container class="fullDisplay" fluid>
    <div>
      <h5>{{ textShow }}</h5>
    </div>
    <div>
      <v-btn class="buttonAdjuster" :color="color" depressed>{{
        number
      }}</v-btn>
      <v-btn class="buttonAdjuster" :color="color" depressed>{{
        character
      }}</v-btn>
    </div>
    <div>
      <v-btn class="buttonAdjuster" :color="color" depressed></v-btn>
      <v-btn class="buttonAdjuster" :color="color" depressed></v-btn>
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
  name: "Easy",
  data() {
    return {
      sensor: "",
      count: 0,
      countEnabled: true,
      numbers: this.$store.state.numbers,
      characters: this.$store.state.characters,
      color: "grey lighten-2",
      number: undefined,
      character: undefined,
      selected: false,
      correctAnswer: undefined,
      trialCount: 0,
      isStopped: true,
      textShow: "",
      holder: [],
      baseline: true,
      easyPattern: this.$store.state.easyPattern,
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
      this.color = "grey lighten-3";
      if (this.isStopped) {
        if (this.trialCount % 2 === 0) {
          this.selected = true;
          this.number = undefined;
          this.character = undefined;
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
          const tempArray = [this.number, this.character];
          this.correctAnswer =
            tempArray[Math.floor(Math.random() * tempArray.length)];
          this.textShow = `Is this the correct pattern?`;
        }
        if (this.trialCount > 18) {
          this.isStopped = false;
          this.$router.push({
            name: "Resting",
            params: { difficulty: "Easy" },
          });
        }
        this.trialCount++;
      }
    },
    optionClicked() {
      this.selected = true;
      const correct =
        this.easyPattern[0] == this.number &&
        this.easyPattern[1] == this.character;
      if (correct) {
        this.color = "green lighten-3";
        // this.$toast.open({
        //   message: "Correct Answer!",
        //   type: "success",
        //   position: "top",
        //   duration: 1000,
        // });
      } else {
        this.color = "red lighten-3";
        // this.$toast.open({
        //   message: "Incorrect Answer!",
        //   type: "error",
        //   position: "top",
        //   duration: 1000,
        // });
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
    this.$store.commit("easySetter", this.holder);
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