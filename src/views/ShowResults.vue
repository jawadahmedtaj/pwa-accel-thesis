<template>
  <v-container class="fullDisplay" fluid>
    <h1>Showing results</h1>
    <h1>Easy</h1>
    {{ easy }}
    <h1>Medium</h1>
    {{ medium }}
    <h1>Hard</h1>
    {{ hard }}
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ShowResults",
  data() {
    return {
      easy: this.$store.state.easy,
      medium: this.$store.state.medium,
      hard: this.$store.state.hard,
    };
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
</style>