<template>
  <v-container class="fullDisplay" fluid>
    <div>{{ textShow }}</div>
    <v-container>
      <v-row justify="center" align="center">
        <v-spacer></v-spacer>
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="primary"
            :disabled="easyDone"
            @click="
              $router.push({
                name: 'Resting',
                params: { difficulty: 'Easy' },
              })
            "
          >
            Easy
          </v-btn></v-col
        >
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="primary"
            @click="
              $router.push({
                name: 'Resting',
                params: { difficulty: 'Medium' },
              })
            "
            :disabled="mediumDone"
          >
            Medium
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="primary"
            @click="
              $router.push({
                name: 'Resting',
                params: { difficulty: 'Hard' },
              })
            "
            :disabled="hardDone"
          >
            Hard
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// import { saveAs } from "file-saver";

export default {
  name: "DifficultySelection",
  data() {
    return {
      easyDone: this.$store.state.easyDone,
      mediumDone: this.$store.state.mediumDone,
      hardDone: this.$store.state.hardDone,
      easy: this.$store.state.easy,
      medium: this.$store.state.medium,
      hard: this.$store.state.hard,
      participant: this.$store.state.participant,
      textShow: "",
    };
  },
  components: {},
  methods: {
    async startCamera() {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      });
    },
  },
  mounted() {
    this.startCamera();
  },
};
</script>

<style lang="sass" scoped>
.fullDisplay
  height: 100vh
  display: flex
  justify-content: center
  flex-direction: column

.resultAdjuster
  margin-top: 50px
</style>