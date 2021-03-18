<template>
  <v-container class="fullDisplay" fluid>
    <div id="app">
      <v-btn
        class="buttonAdjuster"
        color="primary"
        to="/Easy"
        :disabled="easyDone"
        >Easy</v-btn
      >
      <v-btn
        class="buttonAdjuster"
        color="primary"
        to="/Medium"
        :disabled="mediumDone"
        >Medium</v-btn
      >
      <v-btn color="primary" to="/Hard" :disabled="hardDone">Hard</v-btn>
    </div>
    <div>
      <v-btn class="resultAdjuster" color="warning" to="/ShowResults"
        >Save/Show results</v-btn
      >
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "DifficultySelection",
  data() {
    return {
      easyDone: this.$store.state.easyDone,
      mediumDone: this.$store.state.mediumDone,
      hardDone: this.$store.state.hardDone,
    };
  },
  components: {},
  beforeCreate() {},
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
  margin-right: 40px

.resultAdjuster
  width: 100%
  margin-top: 50px
</style>