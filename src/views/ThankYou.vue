<template>
  <v-container class="fullDisplay" fluid>
    <div>
      <p>{{ textShow }}</p>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ThankYou",
  props: ["difficulty"],
  data() {
    return {
      count: this.$store.state.counter,
      textShow: "",
    };
  },
  components: {},
  beforeCreate() {},
  mounted() {
    this.textShow =
      this.count === 3
        ? "Thank you, you will be redirected to resting screen and then you can select next task"
        : "Thank you, the remembering period will start again soon!";
    setTimeout(() => {
      this.$router.push({
        name: "Resting",
        params: { difficulty: this.difficulty },
      });
    }, 10000);
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