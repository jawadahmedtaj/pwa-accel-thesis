<template>
  <v-container class="fullDisplay" fluid>
    <div>
      <h3>Resting</h3>
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
      done: this.$store.state.easyDone,
      count: this.$store.state.counter,
    };
  },
  components: {},
  beforeCreate() {},
  mounted() {
    console.log(this.difficulty);
    setTimeout(() => {
      this.count++;
      if (this.count < 3) {
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
  methods: {},
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