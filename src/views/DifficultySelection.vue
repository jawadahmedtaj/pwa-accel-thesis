<template>
  <v-container class="fullDisplay" fluid>
    <div id="app">
      <div>{{ textShow }}</div>
      <v-btn
        class="buttonAdjuster"
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
      </v-btn>
      <v-btn
        class="buttonAdjuster"
        color="primary"
        @click="
          $router.push({
            name: 'Resting',
            params: { difficulty: 'Medium' },
          })
        "
        :disabled="mediumDone"
        >Medium</v-btn
      >
      <v-btn
        color="primary"
        @click="
          $router.push({
            name: 'Resting',
            params: { difficulty: 'Hard' },
          })
        "
        :disabled="hardDone"
        >Hard</v-btn
      >
    </div>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-spacer></v-spacer>
        <v-col>
          <v-btn
            class="resultAdjuster"
            color="warning"
            @click.prevent="saveFile"
            :disabled="!easyDone"
          >
            Save Easy
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="resultAdjuster"
            color="warning"
            @click.prevent="saveFile"
            :disabled="!mediumDone"
          >
            Save Medium
          </v-btn></v-col
        >
        <v-col>
          <v-btn
            class="resultAdjuster"
            color="warning"
            @click.prevent="saveFile"
            :disabled="!hardDone"
          >
            Save Hard
          </v-btn></v-col
        >
      </v-row>
      <v-spacer></v-spacer>
    </v-container>
  </v-container>
</template>

<script>
import { saveAs } from "file-saver";

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
    async saveFile(fileName) {
      try {
        let blob;
        switch (fileName) {
          case "easy":
            new Blob(
              [
                JSON.stringify({
                  easy: [...this.easy],
                }),
              ],
              {
                type: "application/json",
              }
            );
            this.$store.commit("easySetter", []);
            this.easyDone = true;
            break;
          case "medium":
            new Blob(
              [
                JSON.stringify({
                  medium: [...this.medium],
                }),
              ],
              {
                type: "application/json",
              }
            );
            this.$store.commit("mediumSetter", []);
            this.mediumDone = true;
            break;
          case "hard":
            new Blob(
              [
                JSON.stringify({
                  hard: [...this.hard],
                }),
              ],
              {
                type: "application/json",
              }
            );
            this.$store.commit("hardSetter", []);
            this.hardDone = true;
            break;
        }
        await saveAs(
          blob,
          `${
            this.participant
          } - ${fileName} - PWA accel - ${new Date().getTime()}.json`
        );
      } catch (error) {
        this.textShow = error;
      }
    },
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
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.buttonAdjuster
  margin-right: 40px

.resultAdjuster
  margin-top: 50px
</style>