<template>
  <v-container class="fullDisplay" fluid>
    <div>
      <h5>{{ textShow }}</h5>
    </div>
    <div>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>
        <v-icon>{{ number }}</v-icon>
      </v-btn>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>
        <v-icon>{{ character }}</v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed
        ><v-icon>{{ pattern }}</v-icon></v-btn
      >
      <v-btn class="buttonAdjuster" color="grey lighten-2" depressed>
        <v-icon>{{ arrow }}</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Resting",
  props: ["difficulty"],
  data() {
    return {
      count: this.$store.state.counter,
      numbers: this.$store.state.numbers,
      characters: this.$store.state.characters,
      patterns: this.$store.state.patterns,
      arrows: this.$store.state.arrows,
      number: undefined,
      character: undefined,
      pattern: undefined,
      arrow: undefined,
      easyPattern: [],
      mediumPattern: [],
      hardPattern: [],
      textShow: "",
    };
  },
  components: {},
  beforeCreate() {},
  mounted() {
    if (this.count < 3) {
      this.textShow = "Please remember this pattern (Order will be randomized)";
      if (this.difficulty == "Easy") {
        this.number =
          this.numbers[Math.floor(Math.random() * this.numbers.length)];
        this.character =
          this.characters[Math.floor(Math.random() * this.characters.length)];

        this.easyPattern.push(this.number);
        this.easyPattern.push(this.character);

        this.$store.commit("easyPatternSetter", this.easyPattern);
      } else if (this.difficulty == "Medium") {
        this.number =
          this.numbers[Math.floor(Math.random() * this.numbers.length)];
        this.character =
          this.characters[Math.floor(Math.random() * this.characters.length)];
        this.pattern =
          this.patterns[Math.floor(Math.random() * this.patterns.length)];

        this.mediumPattern.push(this.number);
        this.mediumPattern.push(this.character);
        this.mediumPattern.push(this.pattern);

        this.$store.commit("mediumPatternSetter", this.mediumPattern);
      } else {
        this.number =
          this.numbers[Math.floor(Math.random() * this.numbers.length)];
        this.character =
          this.characters[Math.floor(Math.random() * this.characters.length)];
        this.pattern =
          this.patterns[Math.floor(Math.random() * this.patterns.length)];
        this.arrow =
          this.arrows[Math.floor(Math.random() * this.arrows.length)];

        this.hardPattern.push(this.number);
        this.hardPattern.push(this.character);
        this.hardPattern.push(this.pattern);
        this.hardPattern.push(this.arrow);

        this.$store.commit("hardPatternSetter", this.hardPattern);
      }
    } else {
      this.textShow = "Resting";
    }

    setTimeout(() => {
      if (this.count < 3) {
        this.count++;
        this.$store.commit("countSetter", this.count);
        if (this.difficulty === "Easy") this.$router.push("/Easy");
        else if (this.difficulty === "Medium") this.$router.push("/Medium");
        else this.$router.push("/Hard");
      } else {
        this.count = 0;
        this.$store.commit("countSetter", this.count);
        if (this.difficulty === "Easy")
          this.$store.commit("setDifficulty", "easyDone");
        else if (this.difficulty === "Medium")
          this.$store.commit("setDifficulty", "mediumDone");
        else this.$store.commit("setDifficulty", "hardDone");

        this.$router.push("/DifficultySelection");
      }
    }, 30000);
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
  margin: 15px
</style>